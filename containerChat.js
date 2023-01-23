//Creación de schema
const { Schema, model, connect } = require("mongoose");

require("dotenv").config();
const mongoURL =  process.env.URLMONGO;

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

//Conexión a la DB
async function connectMG() {
  try {
    await connect(
      mongoURL,
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

const chatLog = new Contenedor(Chat);
module.exports = { Contenedor, chatLog };

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
