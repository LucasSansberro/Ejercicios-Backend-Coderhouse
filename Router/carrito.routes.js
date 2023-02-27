import { Router } from "express";
import { userAuth } from "../Controller/usuarios.controller.js";
import { postCarritoController, postProductoCarritoController } from "../Controller/carrito.controller.js";

const routerCarrito = new Router();

routerCarrito.post("/", userAuth, postCarritoController);
routerCarrito.post("/producto/:id", userAuth, postProductoCarritoController);

export default routerCarrito;
