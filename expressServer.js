import { warnLogger } from "./Config/logger.config.js";
import { httpServer, app } from "./Config/appServer.config.js";
import initOptions from "./Config/initArgs.config.js";
import routerCarrito from "./Router/carrito.routes.js";
import routerProductos from "./Router/productos.routes.js";
import routerUsuarios from "./Router/usuarios.routes.js";
import routerRandoms from "./Router/randoms.routes.js";
import "./DB/mongoDAO.js";

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
