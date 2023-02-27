import { Schema, model } from "mongoose";

const ProductosSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  thumbnail: { type: String, required: true },
  timestamp: { type: String, required: true },
});
const Productos = model("productos", ProductosSchema);

export default Productos;
