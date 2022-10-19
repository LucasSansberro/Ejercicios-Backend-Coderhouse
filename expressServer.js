//Carga de clase
const contenedor = require("./contenedor");
const productos = new contenedor.Contenedor("productos");

//Servidor Express
const express = require("express");
const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${PORT}`);
});

server.on("Error", (error) => console.log(`Error en servidor ${error}`));

app.get(`/`, (req, res) => {
  res.send({
    mensaje:
      "Escriba /productos luego de localhost:8080 para ver una lista con todos los productos. Escriba /productoRandom para ver un producto al azar",
  });
});

app.get(`/productos`, (req, res) => {
  res.send({ Productos: productos.getAll() });
});

app.get(`/productoRandom`, (req, res) => {
  //Debido a que contenedor.js está creado para poder recibir arrays de objetos cuyos ID no comiencen con 1, hace falta
  //una iteración  que recoja los ID y cree un número random en base a ellos
  const idList = productos.getAll().map((e) => e.id);
  const numeroRandom =
    Math.floor(Math.random() * (idList[idList.length - 1] - idList[0] + 1)) +
    idList[0];
  res.send({ Producto: productos.getById(numeroRandom) });
});

process.on("SIGINT", function () {
  console.log("\nCerrando servidor");
  process.exit(0);
});
