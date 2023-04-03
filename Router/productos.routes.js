import { Router } from "express";
import {
  getProductosController,
  postProductosController,
  getProductosRandomController,
  postProductosRandomController,
  putProductosController,
  deleteProductosController,
} from "../Controller/productos.controller.js";
import { userAuth } from "../Controller/usuarios.controller.js";
import upload from "../Config/multer.config.js"

const routerProductos = new Router();

routerProductos.get(`/`, userAuth, getProductosController);
routerProductos.post(`/`, upload.single("thumbnail"), userAuth, postProductosController);
routerProductos.put('/:id',userAuth, putProductosController);
routerProductos.delete('/:id', userAuth, deleteProductosController)

routerProductos.get(`/random`, userAuth, getProductosRandomController);
routerProductos.post(`/random`, upload.single("thumbnail"), userAuth, postProductosRandomController);

export default routerProductos;
