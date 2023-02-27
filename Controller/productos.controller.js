import {
  getAllProducts,
  postProductService,
  getProductosRandomService,
  postProductosRandomService,
} from "../Services/productos.service.js";

const getProductosController = async (req, res) => {
  const allProducts = await getAllProducts();
  res.render("products", { products: allProducts, productsExist: true });
};

const postProductosController = (req, res) => {
  postProductService(req);
  return res.redirect("/");
};

const getProductosRandomController = async (req, res) => {
  const productsArray = await getProductosRandomService();
  res.render("productsRandom", {
    products: productsArray,
    productsExist: true,
  });
};

const postProductosRandomController = async (req, res) => {
  await postProductosRandomService();
  res.json({ msg: "Products created" });
};

export { getProductosController, postProductosController, getProductosRandomController, postProductosRandomController };
