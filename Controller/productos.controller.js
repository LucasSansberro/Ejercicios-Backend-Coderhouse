import {
  getAllProducts,
  postProductService,
  getProductosRandomService,
  postProductosRandomService,
  putProductService,
  deleteProductsService,
} from "../Services/productos.service.js";

const getProductosController = async (req, res) => {
  const allProducts = await getAllProducts();
  res.render("products", { products: allProducts, productsExist: true });
};

const postProductosController = (req, res) => {
  postProductService(req);
  return res.redirect("/api/usuarios/login");
};

const putProductosController = async (req, res) => {
  const { id } = req.params;
  putProductService(id, req.body);
  res.json({ msg: "Product updated" });
};

const deleteProductosController = (req, res) => {
  const { id } = req.params;
  deleteProductsService(id);
  res.json({ msg: "Product deleted" });
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

export {
  getProductosController,
  postProductosController,
  putProductosController,
  deleteProductosController,
  getProductosRandomController,
  postProductosRandomController,
};
