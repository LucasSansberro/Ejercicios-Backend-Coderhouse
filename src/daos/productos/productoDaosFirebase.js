const { Contenedor } = require("../../contenedores/contenedorFirebase");

class productoDaosFirebase extends Contenedor {
  constructor() {
    super("productos");
  }
}

module.exports = { productoDaosFirebase };
