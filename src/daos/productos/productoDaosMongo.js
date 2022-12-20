const { Contenedor, Productos } = require("../../contenedores/contenedorMongo");

class productoDaosMongo extends Contenedor {
  constructor() {
    super(Productos);
  }
}

module.exports = { productoDaosMongo };
