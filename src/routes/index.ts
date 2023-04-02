import { Router } from "../deps.ts";
import {
  deleteByIdHandler,
  getAllHandler,
  getByIdHandler,
  saveHandler,
  updateByIdHandler,
} from "../handlers/product.ts";

export const router = new Router()
  .get("/api/products", getAllHandler)
  .get("/api/products/:id", getByIdHandler)
  .post("/api/products", saveHandler)
  .put("/api/products/:id", updateByIdHandler)
  .delete("/api/products/:id", deleteByIdHandler);
