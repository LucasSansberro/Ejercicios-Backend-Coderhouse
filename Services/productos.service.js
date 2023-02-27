import Contenedor from "../DB/mongoDAO.js";
import Productos from "../Models/Productos.js";
import createNProducts from "../Config/faker.config.js";

const productos = new Contenedor(Productos);

const getAllProducts = async () => {
  const allProducts = productos.getAll();
  return allProducts;
};

const postProductService = (req) => {
  let timestamp = new Date().toLocaleString();
  const title = req.body.title;
  const description = req.body.description;
  const code = req.body.code;
  const price = req.body.price;
  const stock = req.body.stock;
  const thumbnail = req.body.thumbnail;
  productos.save({
    title,
    description,
    code,
    price,
    stock,
    thumbnail,
    timestamp,
  });
};

const getProductosRandomService = async () => {
  let productsArray = [];
  createNProducts(productsArray, 5);
  return productsArray;
};

const postProductosRandomService = async () => {
  const productsArray = await getProductosRandomService();
  productsArray.forEach((product) => productos.save(product));
};

export { getAllProducts, postProductService, getProductosRandomService, postProductosRandomService };
