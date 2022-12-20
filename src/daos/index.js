const { productoDaosArchivos } = require("./productos/productoDaosArchivos");
const { carritoDaosArchivos } = require("./carritos/carritoDaosArchivos");
const { productoDaosMongo } = require("./productos/productoDaosMongo");
const { carritoDaosMongo } = require("./carritos/carritoDaosMongo");
const { productoDaosFirebase } = require("./productos/productoDaosFirebase");
const { carritoDaosFirebase } = require("./carritos/carritoDaosFirebase");

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
  {
    nombre: productoDaosMongo,
    id: "mongo",
    descripcion: "producto",
  },
  {
    nombre: carritoDaosMongo,
    id: "mongo",
    descripcion: "carrito",
  },
  {
    nombre: productoDaosFirebase,
    id: "firebase",
    descripcion: "producto",
  },
  {
    nombre: carritoDaosFirebase,
    id: "firebase",
    descripcion: "carrito",
  },
];

const instancia = instancias.filter((i) => i.id == process.env.INSTANCIA);

const resultado = {
  [instancia[0].descripcion]: instancia[0].nombre,
  [instancia[1].descripcion]: instancia[1].nombre,
};

module.exports = { resultado };
