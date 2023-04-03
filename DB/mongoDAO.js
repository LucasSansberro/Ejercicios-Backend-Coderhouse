import { mongoose, connect } from "mongoose";
import { errorLogger, warnLogger } from "../Config/logger.config.js";
import ENV from "../Config/env.config.js";

mongoose.set("strictQuery", false);
const mongoURL = ENV.MONGOURL

try {
  connect(mongoURL, { useNewUrlParser: true });
  warnLogger.info("Conectado a Mongo!");
} catch {
  errorLogger.log("error", {
    mensaje: "There was an error accessing the Database in connectMG() inside containerChat.js",
  });
}

//Contenedor
export default class ContenedorMongo {
  constructor(collection) {
    this.collection = collection;
  }
  async save(objeto) {
    try {
      const object = new this.collection(objeto);
      const id = await object.save();
      return id._id;
    } catch {
      return errorLogger.log("error", {
        mensaje: `Error while trying to save(${objeto}) in containerChat`,
      });
    }
  }
  async editById(id, objeto) {
    try {
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
      const data = await this.collection.findOne({ _id: id }).lean();
      return data;
    } catch {
      return errorLogger.log("error", {
        mensaje: `Error while trying to getById(${id}) in containerChat`,
      });
    }
  }
  async getAll() {
    try {
      const data = await this.collection.find({}).lean();
      return data;
    } catch {
      return errorLogger.log("error", {
        mensaje: "Error while trying to getAll() in containerChat",
      });
    }
  }
  async deleteById(id) {
    try {
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
      await this.collection.deleteMany();
      return "Objects deleted";
    } catch {
      return errorLogger.log("error", {
        mensaje: `Error while trying to deleteAll() in containerChat`,
      });
    }
  }
}
