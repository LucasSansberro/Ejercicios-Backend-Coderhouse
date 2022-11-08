//Carga de clase
const contenedor = require("../contenedor");
const productos = new contenedor.Contenedor("../productos");

//Servidor Express
const express = require("express");
const multer = require("multer");
const app = express();
const PORT = 8080;
const { engine } = require("express-handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../Handlebars/views/images");
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
app.set("views", "./views");
app.use(express.static('views/images')); 
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layout",
    partialsDir: __dirname + "/views/partials",
  })
);

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${PORT}`);
});

server.on("Error", (error) => console.log(`Error en servidor ${error}`));

app.get(`/`, (req, res) => {
  res.render("form");
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
  res.redirect('/productos');
});

process.on("SIGINT", function () {
  console.log("\nCerrando servidor");
  process.exit(0);
});
