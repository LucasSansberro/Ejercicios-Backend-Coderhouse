import { httpServer, app } from "./Config/appServer.config.js";
import routerCarrito from "./Router/carrito.routes.js";
import routerProductos from "./Router/productos.routes.js";
import routerUsuarios from "./Router/usuarios.routes.js";
import routerRandoms from "./Router/randoms.routes.js";
import ENV from "./Config/env.config.js";
import { errorLogger, warnLogger } from "./Config/logger.config.js";

const PORT = ENV.PORT;
const server = httpServer.listen(PORT, () => {
  warnLogger.info(`Servidor http escuchando en el puerto ${PORT}`);
});

server.on("Error", (error) => errorLogger.log(`Error en servidor ${error}`));

app.use("/api/usuarios", routerUsuarios);
app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);
app.use("/api/randoms", routerRandoms);

process.on("SIGINT", () => {
  warnLogger.info("\nCerrando servidor");
  process.exit(0);
});
