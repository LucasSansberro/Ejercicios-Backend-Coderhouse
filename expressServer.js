//Container import
const { chatLog, products, Usuarios, carrito } = require("./containerChat");
const { createNProducts } = require("./faker.js");
const { normalizeChat } = require("./normalizr.js");
const { warnLogger } = require("./loggerConfig");
const { sendMail, sendCartMail } = require("./nodemailer.js");
const { sendPhoneMsg, sendWhatsAppMsg } = require("./twilio");

//Modos de arranque:
// 1 - Normal: nodemon expressServer.js --port 8079
// 2 - PM2 con cluster: pm2 start expressServer.js --name="Cluster4" -i 1 -- --port 8085
// 3 - PM2 con fork:  pm2 start expressServer.js --name="Fork" -- --port 8081
//Para que nginx y el balanceo funcionen correctamente tenemos que tener los puertos del 8080 al 8085 abiertos
const initArgs = require("minimist");
const options = { default: { port: 8080 } };
const initOptions = initArgs(process.argv.slice(2), options);

//Variables de entorno
require("dotenv").config();
const mongoURL = process.env.URLMONGO;

//Express Server
const express = require("express");
const compression = require("compression");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const multer = require("multer");
const app = express();
const PORT = process.env.PORT || initOptions.port;
const { engine } = require("express-handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

//Websocket config
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

//Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "." + file.originalname.split(".").pop());
  },
});
const upload = multer({ storage: storage });

//Config de usuarios en MongoDB
function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    Usuarios.findOne({ username }, (err, user) => {
      if (err) return done(err);

      if (!user) {
        console.log("User Not Found with username " + username);
        return done(null, false);
      }

      if (!isValidPassword(user, password)) {
        console.log("Invalid Password");
        return done(null, false);
      }

      return done(null, user);
    });
  })
);

passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      Usuarios.findOne({ username: username }, async function (err, user) {
        if (err) {
          console.log("Error in SignUp: " + err);
          return done(err);
        }

        if (user) {
          console.log("User already exists");
          return done(null, false);
        }

        let timestamp = new Date().toLocaleString();
        const idNumber = await carrito.save({
          timestamp,
          productos: [],
        });

        const newUser = {
          username: username,
          password: createHash(password),
          nombre: req.body.nombre,
          direccion: req.body.direccion,
          edad: req.body.edad,
          telefono: req.body.telefono,
          avatar: req.body.avatar,
          carrito_id: idNumber,
        };
        sendMail(newUser);
        Usuarios.create(newUser, (err, userWithId) => {
          if (err) {
            console.log("Error in Saving user: " + err);
            return done(err);
          }
          console.log(user);
          console.log("User Registration succesful");
          return done(null, userWithId);
        });
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  Usuarios.findById(id, done);
});

//Handlebars config
app.set("view engine", "hbs");
app.set("views", ".//views");
app.use(express.static("./images"));
app.use(express.static("public"));
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layout",
    partialsDir: __dirname + "/views/partials",
  })
);

//HTTP Server
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: mongoURL,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 60000 * 10,
      cookie: { maxAge: 60000 * 10 },
    }),
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
  })
);
mongoose
  .connect(mongoURL)
  .then(() => console.log("\nConnected to MongoDB\n"))
  .catch((e) => {
    console.error(e);
    throw "Error. Couldn't access the Mongo Database";
  });

app.use(passport.initialize());
app.use(passport.session());

const server = httpServer.listen(PORT, () => {
  console.log(`\nServidor http escuchando en el puerto ${PORT}`);
});

server.on("Error", (error) => console.log(`Error en servidor ${error}`));

app.use((req, res, next) => {
  warnLogger.info({ metodo: req.method, path: req.path });
  next();
});

const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/loginError");
  }
};

app.get("/register", (req, res) => {
  if (req.isAuthenticated()) {
    const { username, password } = req.user;
    const user = { username, password };
    res.render("form", { user });
  } else {
    res.render("register");
  }
});

app.post(
  `/register`,
  upload.single("thumbnail"),
  passport.authenticate("signup", { failureRedirect: "/registerErrorAuth" }),
  (req, res) => {
    const { username, password } = req.user;
    const user = { username, password };
    res.render("form", { user });
  }
);

app.get("/registerErrorAuth", (req, res) => {
  res.render("registerErrorAuth");
});

app.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    const { username, password } = req.user;
    const user = { username, password };
    res.render("form", { user });
  } else {
    res.render("login");
  }
});

app.post(
  `/login`,
  upload.single("thumbnail"),
  passport.authenticate("login", { failureRedirect: "/loginErrorAuth" }),
  (req, res) => {
    const { username, password } = req.user;
    const user = { username, password };
    res.render("form", { user });
  }
);

app.get("/loginError", (req, res) => {
  res.render("loginError");
});

app.get("/loginErrorAuth", (req, res) => {
  res.render("loginErrorAuth");
});

app.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
  res.render("login");
});

app.get(`/`, auth, async (req, res) => {
  const { username, password } = req.user;
  const user = { username, password };
  res.render("form", { user });
});

app.get(`/productos`, auth, async (req, res) => {
  const allProducts = await products.getAll();
  res.render("products", { products: allProducts, productsExist: true });
});

app.post(`/productos`, upload.single("thumbnail"), auth, (req, res) => {
  let timestamp = new Date().toLocaleString();
  const title = req.body.title;
  const description = req.body.description;
  const code = req.body.code;
  const price = req.body.price;
  const stock = req.body.stock;
  const thumbnail = req.body.thumbnail;
  products.save({
    title,
    description,
    code,
    price,
    stock,
    thumbnail,
    timestamp,
  });
  return res.redirect("/");
});

app.post("/carrito/:id", async (req, res) => {
  const { id } = req.params;
  const carrito_usuario = await carrito.getById(req.user.carrito_id);
  const producto = await products.getById(id);
  carrito_usuario[0].productos.push(producto[0]);
  carrito.editById(req.user.carrito_id, carrito_usuario[0]);
  return res.redirect("/productos");
});

app.post("/finalizarCarrito", async (req, res) => {
  const carrito_usuario = await carrito.getById(req.user.carrito_id);
  const productos = carrito_usuario[0].productos;
  sendCartMail(req.user.username, productos);
  sendWhatsAppMsg(JSON.stringify(productos, null, 4));
  sendPhoneMsg(req.user.telefono);
  carrito_usuario[0].productos = [];
  carrito.editById(req.user.carrito_id, carrito_usuario[0]);
  return res.redirect("/productos");
});

app.get(`/productos-test`, auth, (req, res) => {
  let productsArray = [];
  createNProducts(productsArray, 5);
  res.render("productsRandom", {
    products: productsArray,
    productsExist: true,
  });
});

app.post(`/productos-test`, upload.single("thumbnail"), auth, (req, res) => {
  let productsArray = [];
  createNProducts(productsArray, 5);
  productsArray.forEach((product) => products.save(product));
  res.json({ msg: "Products created" });
});

app.get(`/user-info`, auth, async (req, res) => {
  const id = req.user._id.toHexString();
  const { username, nombre, direccion, edad, telefono, avatar } = req.user;
  const carrito_usuario = await carrito.getById(req.user.carrito_id);
  const productosCarrito = carrito_usuario[0].productos;
  res.render("user-info", { username, id, nombre, direccion, edad, telefono, avatar, productos: productosCarrito });
});

app.get(`/info`, (req, res) => {
  res.json({
    "Argumentos de entrada": process.argv.slice(2),
    "Path de ejecución": process.argv[0],
    "Sistema operativo": process.platform,
    "ID del proceso": process.pid,
    "Versión de Node": process.version,
    "Carpeta del proyecto": process.cwd(),
    "Memoria total reservada": process.memoryUsage().rss,
  });
});

//Fork
app.get(`/api/randoms`, (req, res) => {
  let msg = 0;
  req.query.hasOwnProperty("cant") ? (msg = parseInt(req.query.cant)) : (msg = 10000);

  let arrayRandomNum = [];
  let arrayUsedNumber = [];
  let arrayRepeatedResult = [];
  for (let i = 0; i < msg; i++) {
    arrayRandomNum.push(Math.floor(Math.random() * 1000) + 1);
  }

  arrayRandomNum.forEach((num) => {
    if (!arrayUsedNumber.includes(num)) {
      arrayUsedNumber.push(num);
      arrayRepeatedResult.push({
        [num]: arrayRandomNum.filter((repeatedNum) => repeatedNum == num).length,
      });
    }
  });

  res.json({
    Numeros_generados:
      "Usted ha generado " +
      msg +
      " números. Estos, agrupados por repetición, generaron un array de " +
      arrayRepeatedResult.length +
      " elementos",
    numeros: arrayRepeatedResult,
  });
});

app.get("*", (req, res, next) => {
  warnLogger.warn({ metodo: req.method, path: req.path });
  next();
});

//Websocket Server
io.on("connection", async (socket) => {
  const allProducts = await products.getAll();
  io.sockets.emit("lastProducts", allProducts);

  const chat = await chatLog.getAll();
  const normalizedChat = normalizeChat(chat);
  socket.emit("chat", normalizedChat);

  socket.on("userMsg", async (data) => {
    await chatLog.save(data);
    const chat = await chatLog.getAll();
    const normalizedChat = normalizeChat(chat);
    io.sockets.emit("chat", normalizedChat);
  });
});

process.on("SIGINT", function () {
  console.log("\nCerrando servidor");
  process.exit(0);
});
