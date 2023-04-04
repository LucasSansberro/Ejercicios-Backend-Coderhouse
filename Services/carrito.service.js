import { sendPhoneMsg, sendWhatsAppMsg } from "../Config/twilio.config.js";
import { sendCartMail } from "../Config/nodemailer.config.js";
import DAO from "../DB/factory.js";

const postCarritoService = async (req) => {
  let carrito_usuario = await DAO.carrito.getById(req.user.carrito_id);

  //If running in dev mode
  if (carrito_usuario == null) {
    carrito_usuario = await DAO.carrito.getById(1);
  }

  if (carrito_usuario.productos == 0) {
    return;
  }
  sendCartMail(req.user.username, carrito_usuario.productos);
  sendWhatsAppMsg(JSON.stringify(carrito_usuario.productos, null, 4));
  sendPhoneMsg(req.user.telefono);
  carrito_usuario.productos = [];
  DAO.carrito.editById(req.user.carrito_id, carrito_usuario);
};

const postProductoCarritoService = async (id, carritoId) => {
  let producto = await DAO.productos.getById(id);
  let carrito_usuario = await DAO.carrito.getById(carritoId);

  //If running in dev mode
  if (carrito_usuario == null) {
    carrito_usuario = await DAO.carrito.getById(1);
  }

  carrito_usuario.productos.push(producto);
  DAO.carrito.editById(carritoId, carrito_usuario);
};

const deleteProductoCarritoService = async (id, carritoId) => {
  let carrito_usuario = await DAO.carrito.getById(carritoId);

  //If running in dev mode
  if (carrito_usuario == null) {
    carrito_usuario = await DAO.carrito.getById(1);
  }

  const productoEnCarrito = carrito_usuario.productos.find((product) => product._id == id);
  const indexProductoEnCarrito = carrito_usuario.productos.indexOf(productoEnCarrito);
  carrito_usuario.productos.splice(indexProductoEnCarrito, 1);
  DAO.carrito.editById(carritoId, carrito_usuario);
};

export { postCarritoService, postProductoCarritoService, deleteProductoCarritoService };
