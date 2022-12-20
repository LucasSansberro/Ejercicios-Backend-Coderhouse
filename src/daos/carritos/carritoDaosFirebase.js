const { Contenedor } = require("../../contenedores/contenedorFirebase");

class carritoDaosFirebase extends Contenedor {
  constructor() {
    super("carrito");
  }
}

module.exports = { carritoDaosFirebase };
