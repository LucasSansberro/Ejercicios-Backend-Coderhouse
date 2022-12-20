//Carga de clase
const { resultado } = require("./src/daos/index.js");
const productos = new resultado.producto();
const carrito = new resultado.carrito();

//Servidor Express
const express = require("express");
const multer = require("multer");
const app = express();
const routerProductos = express.Router();
const routerCarrito = express.Router();
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const { response } = require("express");
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
};

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${PORT}`);
});

server.on("Error", (error) => console.log(`Error en servidor ${error}`));

app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);

app.get("*", (req, res) => {
  res.json({ error: -2, descripcion: "Ruta no implementada" });
});

routerProductos.get(`/`, async (req, res) => {
  const data = await productos.getAll();
  res.json(data);
});

routerProductos.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await productos.getById(id);
  res.json(data);
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
    res.json({ message: "Operation successful" });
  }
);

routerProductos.put("/:id", middleware, (req, res) => {
  const { id } = req.params;
  const operationCode = productos.editById(id, req.body);
  operationCode == "Error"
    ? res.json({ error: "ID repetido" })
    : res.json({ message: "Operation successful" });
});

routerProductos.delete("/:id", middleware, (req, res) => {
  const { id } = req.params;
  productos.deleteById(id);
  res.json({ message: "Operation successful" });
});

routerCarrito.get("/", async (req, res) => {
  const data = await carrito.getAll();
  res.json(data);
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

routerCarrito.get("/:id/productos", async (req, res) => {
  const { id } = req.params;
  const carro = await carrito.getById(id);
  carro.productos == undefined
    ? res.json(carro[0].productos)
    : res.json(carro.productos);
});

routerCarrito.post("/:id/productos", async (req, res) => {
  const { id } = req.params;
  const carro = await carrito.getById(id);

  if (carro.productos == undefined) {
    carro[0].productos.push(req.body),
      carrito.editById(id, carro[0]),
      res.json({ message: "Operation successful" });
  } else {
    const idCheck = carro.productos.map((producto) => producto.id);
    if (idCheck.includes(req.body.id)) {
      res.json({ error: "Producto repetido", message: "Error" });
    } else {
      carro.productos.push(req.body);
      carrito.editById(id, carro);
      res.json({ message: "Operation successful" });
    }
  }
});

routerCarrito.delete("/:id/productos/:id_prod", async (req, res) => {
  const { id, id_prod } = req.params;
  let carro = await carrito.getById(id);

  if (carro.productos == undefined) {
    const filteredCarro = carro[0].productos.filter(
      (producto) => producto.id != id_prod
    );
    carro[0].productos = filteredCarro;
    carrito.editById(id, carro[0]);
    res.json({ message: "Operation successful" });
  } else {
    const filteredCarro = carro.productos.filter(
      (producto) => producto.id != id_prod
    );
    carro.productos = filteredCarro;
    carrito.editById(id, carro);
    res.json({ message: "Operation successful" });
  }
});

process.on("SIGINT", function () {
  console.log("\nCerrando servidor");
  process.exit(0);
});
