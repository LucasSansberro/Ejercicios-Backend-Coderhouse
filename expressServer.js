const express = require("express");
const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.adress().port}`);
});
server.on("Error", (error) => console.log(`Error en servidor ${error}`));
app.get(`/`, (req, res) => {
  res.send({ mensaje: "Hola mundo" });
});
