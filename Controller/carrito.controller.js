import {
  deleteProductoCarritoService,
  postCarritoService,
  postProductoCarritoService,
} from "../Services/carrito.service.js";

const postCarritoController = async (req, res) => {
  await postCarritoService(req);
  return res.redirect("/api/productos");
};

const postProductoCarritoController = async (req, res) => {
  const { id } = req.params;
  const carritoId = req.user.carrito_id;
  await postProductoCarritoService(id, carritoId);
  return res.redirect("/api/productos");
};

const deleteProductoCarritoController = async (req, res) => {
  const { id } = req.params;
  const carritoId = req.user.carrito_id
  await deleteProductoCarritoService(id, carritoId);
  return res.json({ msg: "Product deleted" });
};

export { postCarritoController, postProductoCarritoController, deleteProductoCarritoController };
