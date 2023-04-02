import { Context, helpers } from "../deps.ts";
import type { Product } from "../types/product.ts";
import { getAll, getById, save, updateById, deleteById } from "../db/product.ts";

export const getAllHandler = (ctx: Context) => {
  ctx.response.body = getAll();
};

export const getByIdHandler = (ctx: Context) => {
  const { id } = helpers.getQuery(ctx, { mergeParams: true });
  const product = getById(parseInt(id));

  if (!product) {
    ctx.response.status = 404;
    ctx.response.body = { message: "Product not found" };
    return;
  }

  ctx.response.body = product;
};

export const saveHandler = async (ctx: Context) => {
  const { price, title } = await ctx.request.body().value;
  const productToSave: Product = {
    price,
    title,
  };
  save(productToSave);
  ctx.response.body = productToSave;
};

export const updateByIdHandler = async (ctx: Context) => {
  const { id } = helpers.getQuery(ctx, { mergeParams: true });
  const product = updateById(parseInt(id), await ctx.request.body().value);
  if (product) {
    ctx.response.body = { message: "Product updated" };
  } else {
    ctx.response.status = 404;
    ctx.response.body = { message: "Product not found" };
  }
};

export const deleteByIdHandler =  (ctx: Context) => {
  const { id } = helpers.getQuery(ctx, { mergeParams: true });
  const result = deleteById(parseInt(id));
  if (result) {
    ctx.response.status = 204;
  } else {
    ctx.response.status = 404;
    ctx.response.body = { message: "Product not found" };
  }
};
