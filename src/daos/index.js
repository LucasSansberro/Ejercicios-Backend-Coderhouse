const { productoDaosArchivos } = require("./productos/productoDaosArchivos");
const { carritoDaosArchivos } = require("./carritos/carritoDaosArchivos");

require("dotenv").config();

const instancias = [
  {
    nombre: productoDaosArchivos,
    id: "archivo",
    descripcion: "producto",
  },
  {
    nombre: carritoDaosArchivos,
    id: "archivo",
    descripcion: "carrito",
  },
];

const instancia = instancias.filter((i) => i.id == process.env.INSTANCIA);

const resultado = {
  [instancia[0].descripcion]: instancia[0].nombre,
  [instancia[1].descripcion]: instancia[1].nombre,
};

module.exports = {resultado};
