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
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

//Server HTTP

const admin = true;
function middleware(req, res, next) {
  admin
    ? next()
    : res.json({
        error: -1,
        message: "No tienes los permisos suficientes para realizar esta acción",
      });
}

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${PORT}`);
});

server.on("Error", (error) => console.log(`Error en servidor ${error}`));

app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);

routerProductos.get(`/`, (req, res) => {
  res.json(productos.getAll());
});

routerProductos.get("/:id", (req, res) => {
  const { id } = req.params;
  res.json(productos.getById(id));
});

routerProductos.post(
  `/`,
  upload.single("thumbnail"),
  middleware,
  (req, res) => {
    let timestamp = new Date().toLocaleString();
    const title = req.body.title;
    const price = req.body.price;
    const thumbnail = req.body.thumbnail;
    const description = req.body.description;
    const code = req.body.code;
    const stock = req.body.stock;
    productos.save({
      title,
      description,
      code,
      price,
      stock,
      thumbnail,
      timestamp,
    });
  }
);

routerProductos.put("/:id", middleware, (req, res) => {
  const { id } = req.params;
  const test = productos.editById(id, req.body);
  test == "Error"
    ? res.json({ error: "ID repetido" })
    : res.json({ message: "Operation successful" });
});

routerProductos.delete("/:id", middleware, (req, res) => {
  const { id } = req.params;
  productos.deleteById(id);
  res.json({ message: "Operation successful" });
});

process.on("SIGINT", function () {
  console.log("\nCerrando servidor");
  process.exit(0);
});
