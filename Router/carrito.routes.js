import { Router } from "express";
import { userAuth } from "../Controller/usuarios.controller.js";
import { deleteProductoCarritoController, postCarritoController, postProductoCarritoController } from "../Controller/carrito.controller.js";

const routerCarrito = new Router();

routerCarrito.post("/", userAuth, postCarritoController);
routerCarrito.post("/producto/:id", userAuth, postProductoCarritoController);
routerCarrito.delete("/producto/:id", userAuth, deleteProductoCarritoController);

export default routerCarrito;
