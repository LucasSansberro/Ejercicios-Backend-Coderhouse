//Creación de schema
const { Schema, model, connect } = require("mongoose");

const ProductosSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  thumbnail: { type: String, required: true },
  timestamp: { type: String, required: true },
});
const Productos = model("productos", ProductosSchema);

const CarritoSchema = new Schema(
  {
    timestamp: { type: String, required: true },
    productos: [
      {
        title: String,
        description: String,
        code: String,
        price: Number,
        stock: Number,
        thumbnail: String,
        timestamp: String,
      },
    ],
  },
  {
    virtuals: true,
  }
);
const Carrito = model("carrito", CarritoSchema);

//Conexión a la DB
async function connectMG() {
  try {
    await connect(
      "mongodb+srv://lucassansberro:YTJjWyrti6fYUtX0@coderhouse-backend.61noa9o.mongodb.net/?retryWrites=true&w=majority",
      { useNewUrlParser: true }
    );
  } catch (e) {
    console.log(e);
    throw "Error en la conexión";
  }
}

//Contenedor
class Contenedor {
  constructor(collection) {
    this.collection = collection;
  }
  async save(objeto) {
    try {
      await connectMG();
      const object = new this.collection(objeto);
      await object.save();
      return "Object saved";
    } catch {
      return "There was an error accessing the Database";
    }
  }
  async editById(id, objeto) {
    try {
      await connectMG();
      await this.collection.findOneAndUpdate(
        { _id: id },
        {
          $set: objeto,
        }
      );
      return "Object updated";
    } catch {
      ("There was an error accessing the Database");
    }
  }
  async getById(id) {
    try {
      await connectMG();
      const data = await this.collection.find({ _id: id });
      return data;
    } catch {
      return "There was an error accessing the Database";
    }
  }
  async getAll() {
    try {
      await connectMG();
      const data = await this.collection.find({});
      return data;
    } catch {
      return "There was an error accessing the Database";
    }
  }
  async deleteById(id) {
    try {
      await connectMG();
      await this.collection.deleteOne({ _id: id });
      return "Object deleted";
    } catch {
      return "There was an error accessing the Database";
    }
  }
  async deleteAll() {
    try {
      await connectMG();
      await this.collection.deleteMany();
      return "Objects deleted";
    } catch {
      return "There was an error accessing the Database";
    }
  }
}

module.exports = { Contenedor, Productos, Carrito };
