import { postCarritoService, postProductoCarritoService } from "../Services/carrito.service.js";

const postCarritoController = async (req, res) => {
  await postCarritoService(req);
  return res.redirect("/productos");
};

const postProductoCarritoController = async (req, res) => {
  await postProductoCarritoService(req);
  return res.redirect("/productos");
};

export { postCarritoController, postProductoCarritoController };
