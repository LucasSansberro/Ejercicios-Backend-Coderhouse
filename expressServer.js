import { warnLogger } from "./Config/logger.config.js";
import { httpServer, app } from "./Config/appServer.config.js";
import initOptions from "./Config/initArgs.config.js";
import routerCarrito from "./Router/carrito.routes.js";
import routerProductos from "./Router/productos.routes.js";
import routerUsuarios from "./Router/usuarios.routes.js";
import routerRandoms from "./Router/randoms.routes.js";
import "./DB/mongoDAO.js";

//GRAPHQL
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import crypto from "crypto";

const schema = buildSchema(`
  type Producto {
    id: ID!
    title: String,
    description: String,
    code: String,
    price: Int,
    stock: Int,
    thumbnail: String,
    timestamp: String
  }
  input ProductoInput {
    title: String,
    description: String,
    code: String,
    price: Int,
    stock: Int,
    thumbnail: String,
    timestamp: String
  }
  type Query {
    getProducto(id: ID!): Producto,
    getProductos(campo: String, valor: String): [Producto],
  }
  type Mutation {
    createProducto(datos: ProductoInput): Producto
    updateProducto(id: ID!, datos: ProductoInput): Producto,
    deleteProducto(id: ID!): Producto,
  }
`);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: {
      getProductos,
      getProducto,
      createProducto,
      updateProducto,
      deleteProducto,
    },
    graphiql: true,
  })
);

class Producto {
  constructor(id, { title, description, code, price, stock, thumbnail }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.code = code;
    this.price = price;
    this.stock = stock;
    this.thumbnail = thumbnail;
    this.timestamp = new Date().toLocaleString();
  }
}

const productosMap = {};

function getProductos({ campo, valor }) {
  const productos = Object.values(productosMap);
  if (campo && valor) {
    return productos.filter((p) => p[campo] == valor);
  } else {
    return productos;
  }
}

function getProducto({ id }) {
  if (!productosMap[id]) {
    throw new Error("Producto not found.");
  }
  return productosMap[id];
}

function createProducto({ datos }) {
  const id = crypto.randomBytes(10).toString("hex");
  const nuevoProducto = new Producto(id, datos);
  productosMap[id] = nuevoProducto;
  return nuevoProducto;
}

function updateProducto({ id, datos }) {
  if (!productosMap[id]) {
    throw new Error("Producto not found");
  }
  const productoActualizado = new Producto(id, datos);
  productosMap[id] = productoActualizado;
  return productoActualizado;
}

function deleteProducto({ id }) {
  if (!productosMap[id]) {
    throw new Error("Producto not found");
  }
  const productoBorrado = productosMap[id];
  delete productosMap[id];
  return productoBorrado;
}

//FIN GRAPHQL

const PORT = process.env.PORT || initOptions.port;
const server = httpServer.listen(PORT, () => {
  console.log(`\nServidor http escuchando en el puerto ${PORT}`);
});

server.on("Error", (error) => console.log(`Error en servidor ${error}`));

app.use("/api/usuarios", routerUsuarios);
app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);
app.use("/api/randoms", routerRandoms);

app.get("*", (req, res, next) => {
  warnLogger.warn({ metodo: req.method, path: req.path });
  next();
});

process.on("SIGINT", function () {
  console.log("\nCerrando servidor");
  process.exit(0);
});
