const { options } = require("./options");
const knex = require("knex")(options);

knex.schema
  .createTable("products", (table) => {
    table.increments("id"),
      table.string("title"),
      table.string("description"),
      table.string("code"),
      table.integer("price"),
      table.integer("stock"),
      table.string("thumbnail"),
      table.string("timestamp");
  })
  .then(() => {
    console.log("Table created");
  })
  .catch((err) => {
    console.log(err);
    throw new Error(err);
  })
  .finally(() => {
    knex.destroy();
  });
