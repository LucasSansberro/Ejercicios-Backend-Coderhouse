const { Contenedor } = require("../../contenedores/contenedorArchivos");

class productoDaosArchivos extends Contenedor {
  constructor() {
    super("./src/DB/productos");
    this.array = [];
  }
}

module.exports = { productoDaosArchivos };
