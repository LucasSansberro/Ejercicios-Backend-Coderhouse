const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./DB/SQLite/ecommerce.sqlite",
  },
  useNullAsDefault: true,
});

class Container {
  constructor(table) {
    this.table = table;
  }

  async save(object) {
    try {
      await knex(this.table).insert(object);
      return "Object saved";
    } catch {
      return "There was an error accessing the Database";
    }
  }

  async editById(id, object) {
    try {
      await knex(this.table).where("id", "=", id).update(object);
      return "Object updated";
    } catch {
      ("There was an error accessing the Database");
    }
  }

  async getById(id) {
    try {
      const data = await knex(this.table).where("id", "=", id).select();
      return data;
    } catch {
      return "There was an error accessing the Database";
    }
  }

  async getAll() {
    try {
      const data = await knex(this.table).select("*");
      return data;
    } catch {
      return "There was an error accessing the Database";
    }
  }

  async deleteById(id) {
    try {
      await knex(this.table).where("id", "=", id).del();
      return "Object deleted";
    } catch {
      return "There was an error accessing the Database";
    }
  }

  async deleteAll() {
    try {
      knex(this.table).del();
      return "All content in the table has been removed";
    } catch {
      return "There was an error accessing the Database";
    }
  }
}

module.exports = { Container };
