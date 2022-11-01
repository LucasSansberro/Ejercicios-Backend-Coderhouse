//Carga de clase
const contenedor = require("./contenedor");
const productos = new contenedor.Contenedor("productos");

//Servidor Express
const express = require("express");
const multer = require("multer");
const app = express();
const routerProductos = express.Router();
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

routerProductos.post(`/`, (req, res) => {
  console.log("Post recibido");
  productos.save(req.body);
  res.send(`El objeto ha sido agregado con éxito`);
});

routerProductos.put("/:id", (req, res) => {
  const { id } = req.params;
  productos.editById(id, req.body);
  const producto = productos.getById(id);
  producto != null
    ? res.send(`El producto ha sido editado con éxito`)
    : res.send({ error: "Producto no encontrado" });
});

routerProductos.get("/:id", (req, res) => {
  const { id } = req.params;
  const producto = productos.getById(id);
  producto != null
    ? res.send({ Producto: producto })
    : res.send({ error: "Producto no encontrado" });
});

routerProductos.delete("/:id", (req, res) => {
  const { id } = req.params;
  productos.deleteById(id);
  const producto = productos.getById(id);
  producto != null
    ? res.send(`El producto ha sido removido con éxito`)
    : res.send({ error: "Producto no encontrado" });
});

process.on("SIGINT", function () {
  console.log("\nCerrando servidor");
  process.exit(0);
});
