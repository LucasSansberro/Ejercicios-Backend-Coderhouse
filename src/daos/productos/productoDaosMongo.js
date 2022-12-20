const { Contenedor, Productos } = require("../../contenedores/contenedorMongo");

class productoDaosMongo extends Contenedor {
  constructor() {
    super(Productos);
    this.array = [];
  }
}

module.exports = { productoDaosMongo };
