import { sendPhoneMsg, sendWhatsAppMsg } from "../Config/twilio.config.js";
import { sendCartMail } from "../Config/nodemailer.config.js";
import DAO from "../DB/factory.js"

const postCarritoService = async (req) => {
  const carrito_usuario = await DAO.carrito.getById(req.user.carrito_id);
  const productos = carrito_usuario[0].productos;
  sendCartMail(req.user.username, productos);
  sendWhatsAppMsg(JSON.stringify(productos, null, 4));
  sendPhoneMsg(req.user.telefono);
  carrito_usuario[0].productos = [];
  DAO.carrito.editById(req.user.carrito_id, carrito_usuario[0]);
};

const postProductoCarritoService = async (req) => {
  const { id } = req.params;
  const carrito_usuario = await DAO.carrito.getById(req.user.carrito_id);
  const producto = await DAO.products.getById(id);
  carrito_usuario[0].productos.push(producto[0]);
  DAO.carrito.editById(req.user.carrito_id, carrito_usuario[0]);
};

export { postCarritoService, postProductoCarritoService };
