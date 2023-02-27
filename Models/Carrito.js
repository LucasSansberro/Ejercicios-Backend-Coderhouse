import { Schema, model } from "mongoose";

const CarritoSchema = new Schema(
  {
    timestamp: { type: String, required: true },
    productos: [
      {
        title: String,
        description: String,
        code: String,
        price: Number,
        stock: Number,
        thumbnail: String,
        timestamp: String,
      },
    ],
  },
  {
    virtuals: true,
  }
);
const Carrito = model("carrito", CarritoSchema);

export default Carrito;
