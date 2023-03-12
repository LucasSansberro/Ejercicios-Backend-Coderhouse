import createNProducts from "../Config/faker.config.js";
import DAO from "../DB/factory.js"
const getAllProducts = async () => {
  const allProducts = DAO.productos.getAll();
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
  DAO.productos.save({
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
  productsArray.forEach((product) => DAO.productos.save(product));
};

export { getAllProducts, postProductService, getProductosRandomService, postProductosRandomService };
