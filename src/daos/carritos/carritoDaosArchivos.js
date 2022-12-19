const { Contenedor } = require("../../contenedores/contenedorArchivos");

class carritoDaosArchivos extends Contenedor {
  constructor() {
    super("./src/DB/carrito");
    this.array = [];
  }
}

module.exports = { carritoDaosArchivos };
