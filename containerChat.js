//Creación de schema
const { Schema, model, connect } = require("mongoose");
const { errorLogger } = require("./loggerConfig");

require("dotenv").config();
const mongoURL = process.env.URLMONGO;

const chatSchema = new Schema({
  author: {
    id: { type: String },
    nombre: { type: String, required: true },
    apellido: { type: String },
    edad: { type: Number },
    alias: { type: String },
    avatar: { type: String },
  },
  text: { type: String },
  timestamp: { type: String },
});
const Chat = model("chat", chatSchema);

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

//Conexión a la DB
async function connectMG() {
  try {
    await connect(mongoURL, { useNewUrlParser: true });
  } catch {
    return errorLogger.log("error", {
      mensaje: "There was an error accessing the Database in connectMG() inside containerChat.js",
    });
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
      return errorLogger.log("error", {
        mensaje: `Error while trying to save(${objeto}) in containerChat`,
      });
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
      return errorLogger.log("error", {
        mensaje: `Error while trying to editById(${id}, ${objeto}) in containerChat`,
      });
    }
  }
  async getById(id) {
    try {
      await connectMG();
      const data = await this.collection.find({ _id: id });
      return data;
    } catch {
      return errorLogger.log("error", {
        mensaje: `Error while trying to getById(${id}) in containerChat`,
      });
    }
  }
  async getAll() {
    try {
      await connectMG();
      const data = await this.collection.find({});
      return data;
    } catch {
      return errorLogger.log("error", {
        mensaje: "Error while trying to getAll() in containerChat",
      });
    }
  }
  async deleteById(id) {
    try {
      await connectMG();
      await this.collection.deleteOne({ _id: id });
      return "Object deleted";
    } catch {
      return errorLogger.log("error", {
        mensaje: `Error while trying to deleteById(${id}) in containerChat`,
      });
    }
  }
  async deleteAll() {
    try {
      await connectMG();
      await this.collection.deleteMany();
      return "Objects deleted";
    } catch {
      return errorLogger.log("error", {
        mensaje: `Error while trying to deleteAll() in containerChat`,
      });
    }
  }
}

const chatLog = new Contenedor(Chat);
const products = new Contenedor(Productos);
module.exports = { chatLog, products };

/* test.save({
  author: {
    id: "test",
    nombre: "Test",
    apellido: "test",
    edad: 12,
    alias: "test",
    avatar: "test",
  },
  text: "Test",
  timestamp: "test",
}); */
