//Container import
const container = require("./container");
const chatContainer = require("./containerChat");
const products = new container.Container("products");
const chatLog = new chatContainer.Container("chat");
const { createNProducts } = require("./faker.js");

//Express Server
const express = require("express");
const multer = require("multer");
const app = express();
const PORT = 8080;
const { engine } = require("express-handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Websocket config
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

//Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".").pop()
    );
  },
});
const upload = multer({ storage: storage });

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
const server = httpServer.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${PORT}`);
});

server.on("Error", (error) => console.log(`Error en servidor ${error}`));

app.get(`/`, (req, res) => {
  res.render("form");
});

app.get(`/productos`, async (req, res) => {
  const allProducts = await products.getAll();
  res.render("products", { products: allProducts, productsExist: true });
});

app.post(`/productos`, upload.single("thumbnail"), (req, res) => {
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

app.get(`/productos-test`, (req, res) => {
  let productsArray = [];
  createNProducts(productsArray, 5);
  res.render("productsRandom", { products: productsArray,productsExist: true  });
});

app.post(`/productos-test`, upload.single("thumbnail"), (req, res) => {
  let productsArray = [];
  createNProducts(productsArray, 5);
  productsArray.forEach((product) => products.save(product));
  res.json({ msg: "Products created" });
});

//Websocket Server
io.on("connection", async (socket) => {
  const allProducts = await products.getAll();
  io.sockets.emit("lastProducts", allProducts);
  const chat = await chatLog.getAll();
  socket.emit("chat", chat);

  socket.on("userMsg", async (data) => {
    await chatLog.save(data);
    const chat = await chatLog.getAll();
    io.sockets.emit("chat", chat);
  });
});

process.on("SIGINT", function () {
  console.log("\nCerrando servidor");
  process.exit(0);
});
