const { Contenedor, Carrito } = require("../../contenedores/contenedorMongo");

class carritoDaosMongo extends Contenedor {
  constructor() {
    super(Carrito);
  }
}

module.exports = { carritoDaosMongo };
