import { sendPhoneMsg, sendWhatsAppMsg } from "../Config/twilio.config.js";
import { sendCartMail } from "../Config/nodemailer.config.js";
import DAO from "../DB/factory.js";

const postCarritoService = async (req) => {
  const carrito_usuario = await DAO.carrito.getById(req.user.carrito_id);
  let productos;
  if (carrito_usuario != null) {
    productosCarrito = carrito_usuario.productos;
  } else {
    productosCarrito = await DAO.carrito.getById(1);
    productosCarrito = productosCarrito.productos;
  }
  //TODO Cambiar esto que está desprolijo
  sendCartMail(req.user.username, productos);
  sendWhatsAppMsg(JSON.stringify(productos, null, 4));
  sendPhoneMsg(req.user.telefono);
  carrito_usuario.productos = [];
  DAO.carrito.editById(req.user.carrito_id, carrito_usuario);
};

const postProductoCarritoService = async (req) => {
  const { id } = req.params;
  let carrito_usuario = await DAO.carrito.getById(req.user.carrito_id);
  let producto = await DAO.productos.getById(id);

  if (carrito_usuario != null) {
    return;
  } else {
    carrito_usuario = await DAO.carrito.getById(1);
    const productsOldId = await DAO.productos.getAll();
    producto = productsOldId.find((item) => item._id == id);
  }
  //TODO Cambiar esto que está desprolijo

  carrito_usuario.productos.push(producto);
  DAO.carrito.editById(req.user.carrito_id, carrito_usuario);
};

export { postCarritoService, postProductoCarritoService };
