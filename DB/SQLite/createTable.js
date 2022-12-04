const { options } = require("./options");
const knex = require("knex")(options);

knex.schema
  .createTable("chat", (table) => {
    table.increments("id"),
      table.string("userEmail"),
      table.string("userMsg"),
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