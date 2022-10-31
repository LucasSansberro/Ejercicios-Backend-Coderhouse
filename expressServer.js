//Carga de clase
const contenedor = require("./contenedor");
const productos = new contenedor.Contenedor("productos");

//Servidor Express
const express = require("express");
const { Router } = express;
const multer = require("multer");
const app = express();
const routerProductos = Router();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${PORT}`);
});

server.on("Error", (error) => console.log(`Error en servidor ${error}`));

app.use("/api/productos", routerProductos);

app.get(`/`, (req, res) => {
  res.send(
    `<h1>Escriba api/productos luego de localhost:8080 para ingresar a la API. Escriba /formulario para agregar un producto</h1>`
  );
});

app.get(`/formulario`, (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
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

app.post(`/uploadFile`, upload.single("thumbnail"), (req, res) => {
  const title = req.body.title;
  const price = req.body.price;
  const thumbnail = req.file;
  productos.save({
    title: title,
    price: price,
    thumbnail: `/uploads/${thumbnail.filename}`,
  });
  res.send(`<h1> El objeto ha sido agregado con éxito </h1>`);
});

routerProductos.get(`/`, (req, res) => {
  res.send({ Productos: productos.getAll() });
});

routerProductos.get(`/:id`, (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.send({ Productos: productos.getAll() });
});

process.on("SIGINT", function () {
  console.log("\nCerrando servidor");
  process.exit(0);
});
