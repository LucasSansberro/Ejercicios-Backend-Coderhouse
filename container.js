const { options } = require(`./DB/MySQL/options`);
const knex = require("knex")(options);
const { errorLogger } = require("./loggerConfig");

class Container {
  constructor(table) {
    this.table = table;
  }

  async save(object) {
    try {
      await knex(this.table).insert(object);
      return "Object saved";
    } catch {
      return errorLogger.log("error", {
        mensaje: `Error while trying to save(${objeto}) in container`,
      });
    }
  }

  async editById(id, object) {
    try {
      await knex(this.table).where("id", "=", id).update(object);
      return "Object updated";
    } catch {
      return errorLogger.log("error", {
        mensaje: `Error while trying to editById(${id}, ${objeto}) in container`,
      });
    }
  }

  async getById(id) {
    try {
      const data = await knex(this.table).where("id", "=", id).select();
      return data;
    } catch {
      return errorLogger.log("error", {
        mensaje: `Error while trying to getById(${id}) in container`,
      });
    }
  }

  async getAll() {
    try {
      const data = await knex(this.table).select("*");
      return data;
    } catch {
      return errorLogger.log("error", {
        mensaje: "Error while trying to getAll() in container",
      });
    }
  }

  async deleteById(id) {
    try {
      await knex(this.table).where("id", "=", id).del();
      return "Object deleted";
    } catch {
      return errorLogger.log("error", {
        mensaje: `Error while trying to deleteById(${id}) in container`,
      });
    }
  }

  async deleteAll() {
    try {
      knex(this.table).del();
      return "All content in the table has been removed";
    } catch {
      return errorLogger.log("error", {
        mensaje: `Error while trying to deleteAll() in container`,
      });
    }
  }
}

module.exports = { Container };
