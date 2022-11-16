//Carga de clase
const contenedor = require("./contenedor");
const productos = new contenedor.Contenedor("productos");
const fs = require("fs");

//Servidor Express
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

//Server HTTP
const server = httpServer.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${PORT}`);
});

server.on("Error", (error) => console.log(`Error en servidor ${error}`));

let chat = [];
const readChat = async () => {
  try {
    const previousData = await fs.promises.readFile(`./chatLog.txt`, "utf-8");
    const previousDataHolder = JSON.parse(previousData);
    chat = [...previousDataHolder];
    return chat;
  } catch {
    return
  }
};

app.get(`/`, (req, res) => {
  res.render("form");
  readChat();
});

app.get(`/productos`, (req, res) => {
  res.render("products", { products: productos.getAll(), productsExist: true });
});

app.post(`/productos`, upload.single("thumbnail"), (req, res) => {
  const title = req.body.title;
  const price = req.body.price;
  const thumbnail = req.file;
  productos.save({
    title: title,
    price: price,
    thumbnail: `${thumbnail.filename}`,
  });
  res.redirect("/productos");
});

const saveChat =  () => {
  try {
    fs.writeFileSync(`./chatLog.txt`, JSON.stringify(chat, null, 2));
  } catch {
    console.log("Error en la escritura");
  }
};

//Server Websocket
io.on("connection", (socket) => {
  console.log("Se ha conectado un usuario");
  io.sockets.emit("lastProducts", productos.getAll());
  socket.emit("chat", chat);

  socket.on("userMsg", (data) => {
    chat.push(data);
    io.sockets.emit("chat", chat);
    saveChat();
  });
});

process.on("SIGINT", function () {
  console.log("\nCerrando servidor");
  process.exit(0);
});
