const { Contenedor, Carrito } = require("../../contenedores/contenedorMongo");

class carritoDaosMongo extends Contenedor {
  constructor() {
    super(Carrito);
    this.array = [];
  }
}

module.exports = { carritoDaosMongo };
