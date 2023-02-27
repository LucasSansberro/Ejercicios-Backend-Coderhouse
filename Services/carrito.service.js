import Contenedor from "../DB/mongoDAO.js";
import Carrito from "../Models/Carrito.js";
import Productos from "../Models/Productos.js";
import { sendPhoneMsg, sendWhatsAppMsg } from "../Config/twilio.config.js";
import { sendCartMail } from "../Config/nodemailer.config.js";

const carrito = new Contenedor(Carrito);
const products = new Contenedor(Productos);

const postCarritoService = async (req) => {
  const carrito_usuario = await carrito.getById(req.user.carrito_id);
  const productos = carrito_usuario[0].productos;
  sendCartMail(req.user.username, productos);
  sendWhatsAppMsg(JSON.stringify(productos, null, 4));
  sendPhoneMsg(req.user.telefono);
  carrito_usuario[0].productos = [];
  carrito.editById(req.user.carrito_id, carrito_usuario[0]);
};

const postProductoCarritoService = async (req) => {
  const { id } = req.params;
  const carrito_usuario = await carrito.getById(req.user.carrito_id);
  const producto = await products.getById(id);
  carrito_usuario[0].productos.push(producto[0]);
  carrito.editById(req.user.carrito_id, carrito_usuario[0]);
};

export { postCarritoService, postProductoCarritoService };
