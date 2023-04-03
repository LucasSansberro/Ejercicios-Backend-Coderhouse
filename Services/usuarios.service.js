import DAO from "../DB/factory.js";

const getInfoUser = (req) => {
  const { username, password } = req.user;
  const user = { username, password };
  return user;
};

const getAllInfoUser = async (req) => {
  const carrito_usuario = await DAO.carrito.getById(req.user.carrito_id);
  let productosCarrito;
  if (carrito_usuario != null) {
    productosCarrito = carrito_usuario.productos;
  } else {
    //In case we run the server in dev mode, we search for a mocked cart, for testing purposes
    const carritoMock = await DAO.carrito.getById(1);
    productosCarrito = carritoMock.productos;
  }

  const id = req.user._id.toHexString();
  const { username, nombre, direccion, edad, telefono, avatar } = req.user;
  const user = { username, nombre, direccion, edad, telefono, avatar, id };
  return { user, productosCarrito };
};

export { getInfoUser, getAllInfoUser };
