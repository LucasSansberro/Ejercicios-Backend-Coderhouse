const options = {
  client: "sqlite3",
  connection: {
    filename: "./ecommerce.sqlite",
  },
  useNullAsDefault: true,
};

module.exports = {
  options,
};

/* const options = {
  client: "sqlite3",
  connection: {
    filename: "./DB/SQLite/ecommerce.sqlite",
  },
  useNullAsDefault: true,
};

module.exports = {
  options,
};
 */