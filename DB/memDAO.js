import { errorLogger } from "../Config/logger.config.js";

export default class ContenedorMem {
  constructor(array) {
    this.array = array;
  }
  async save(objeto) {
    try {
      const lastId = this.array[this.array.length - 1]._id + 1;
      const objetoFinal = { ...objeto, _id: lastId };
      this.array.push(objetoFinal);
    } catch {
      return errorLogger.log("error", {
        mensaje: `Error while trying to save(${objeto}) in memDAO`,
      });
    }
  }
  async editById(id, objeto) {
    try {
      const originalItem = this.array.find((item) => item.id == id);
      this.array[this.array.indexOf(originalItem)] = objeto;
      return "Object updated";
    } catch {
      return errorLogger.log("error", {
        mensaje: `Error while trying to editById(${id}, ${objeto}) in memDAO`,
      });
    }
  }
  async getById(id) {
    try {
      return this.array.find((item) => item.id == id);
    } catch {
      return errorLogger.log("error", {
        mensaje: `Error while trying to getById(${id}) in memDAO`,
      });
    }
  }
  async getAll() {
    try {
      return this.array;
    } catch {
      return errorLogger.log("error", {
        mensaje: "Error while trying to getAll() in memDAO",
      });
    }
  }
  async deleteById(id) {
    try {
      this.array = this.array.filter((item) => item.id != id);
      return "Object deleted";
    } catch {
      return errorLogger.log("error", {
        mensaje: `Error while trying to deleteById(${id}) in memDAO`,
      });
    }
  }
  async deleteAll() {
    try {
      this.array = [];
      return "Objects deleted";
    } catch {
      return errorLogger.log("error", {
        mensaje: `Error while trying to deleteAll() in memDAO`,
      });
    }
  }
}
