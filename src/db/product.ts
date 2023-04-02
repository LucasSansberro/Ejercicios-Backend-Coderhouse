// deno-lint-ignore-file
import type { Product } from "../types/product.ts";

let products: Product[] = [
  {
    id: 1,
    price: 500,
    title: "Manteca",
  },
  {
    id: 2,
    price: 600,
    title: "Aceite",
  },
  {
    id: 3,
    price: 300,
    title: "Leche",
  },
];

export const getAll = (): Product[] => {
  return products;
};

export const getById = (id: number): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const save = (product: Product): Product => {
  const lastId = products[products.length - 1].id! + 1;
  products.push({ ...product, id: lastId });
  return product;
};

export const updateById = (id: number, updatedProduct: Product): string => {
  const product = products.find((p) => p.id === id);
  if (product != undefined) {
    const indexOfSearchedProduct = products.indexOf(product);
    products[indexOfSearchedProduct] = { ...updatedProduct, id };
    return "Update successful";
  }
  return "Error while updating the product";
};

export const deleteById = (id: number): string => {
  try {
    products = products.filter((p) => p.id !== id);
    return "Delete successful";
  } catch (error) {
    return "Error deleting the desired product";
  }
};
