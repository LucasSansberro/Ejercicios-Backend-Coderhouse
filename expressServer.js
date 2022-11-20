//Carga de clase
const contenedor = require("./contenedor");
const productos = new contenedor.Contenedor("productos");

//Servidor Express
const express = require("express");
const multer = require("multer");
const app = express();
const routerProductos = express.Router();
const routerCarrito = express.Router();
const PORT = process.env.PORT || 8080;
const { engine } = require("express-handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Multer config
//Considerar borrar
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
app.set("views", "views");
app.use(express.static(__dirname));
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layout",
    partialsDir: __dirname + "/views/partials",
    helpers: {
      json: (object) => {
        return JSON.stringify(object);
      },
    },
  })
);

//Server HTTP
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${PORT}`);
});

server.on("Error", (error) => console.log(`Error en servidor ${error}`));

app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);

routerProductos.get(`/`, (req, res) => {
  res.render("products", { products: productos.getAll(), productsExist: true });
});

routerProductos.post(`/`, upload.single("thumbnail"), (req, res) => {
  const title = req.body.title;
  const price = req.body.price;
  const thumbnail = req.body.thumbnail;
  productos.save({
    title,
    price,
    thumbnail,
  });
  res.redirect("/api/productos");
});

routerProductos.delete("/:id", (req, res) => {
  const { id } = req.params;
  productos.deleteById(id);
  res.send({ response: "success" });
});

process.on("SIGINT", function () {
  console.log("\nCerrando servidor");
  process.exit(0);
});
