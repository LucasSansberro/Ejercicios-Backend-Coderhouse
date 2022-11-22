//Carga de clase
const contenedor = require("./contenedor");
const productos = new contenedor.Contenedor("productos");
const carrito = new contenedor.Contenedor("carrito");

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
const middleware = (req, res, next) => {
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

routerCarrito.get("/", (req, res) => {
  res.json(carrito.getAll());
});

routerCarrito.post(`/`, upload.single("thumbnail"), async (req, res) => {
  let timestamp = new Date().toLocaleString();
  const idNumber = await carrito.save({
    timestamp,
    productos: [],
  });
  res.json({ id: idNumber });
});

routerCarrito.delete("/:id", (req, res) => {
  const { id } = req.params;
  carrito.deleteById(id);
  res.json({ message: "Operation successful" });
});

routerCarrito.get("/:id/productos", (req, res) => {
  const { id } = req.params;
  const carro = carrito.getById(id);
  res.json(carro.productos);
});

routerCarrito.post("/:id/productos", (req, res) => {
  const { id } = req.params;
  const carro = carrito.getById(id);
  const idCheck = carro.productos.map((producto) => producto.id);

  if (idCheck.includes(req.body.id)) {
    res.json({ error: "Producto repetido", message: "Error" });
  } else {
    carro.productos.push(req.body);
    carrito.editById(id, carro);
    res.json({ message: "Operation successful" });
  }
});

routerCarrito.delete("/:id/productos/:id_prod", (req, res) => {
  const { id, id_prod } = req.params;
  let carro = carrito.getById(id);
  const filteredCarro = carro.productos.filter(
    (producto) => producto.id != id_prod
  );
  carro.productos = filteredCarro;
  carrito.editById(id, carro);
  res.json({ message: "Operation successful" });
});

process.on("SIGINT", function () {
  console.log("\nCerrando servidor");
  process.exit(0);
});
