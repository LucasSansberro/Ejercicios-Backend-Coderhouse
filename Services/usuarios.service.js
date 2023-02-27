import Contenedor from "../DB/mongoDAO.js";
import Carrito from "../Models/Carrito.js";

const carrito = new Contenedor(Carrito);

const getInfoUser = (req) => {
  const { username, password } = req.user;
  const user = { username, password };
  return user;
};

const getAllInfoUser = async (req) => {
  const carrito_usuario = await carrito.getById(req.user.carrito_id);
  const productosCarrito = carrito_usuario[0].productos;
  const id = req.user._id.toHexString();
  const { username, nombre, direccion, edad, telefono, avatar } = req.user;
  const user = { username, nombre, direccion, edad, telefono, avatar, id };
  return { user, productosCarrito };
};

export { getInfoUser, getAllInfoUser };
