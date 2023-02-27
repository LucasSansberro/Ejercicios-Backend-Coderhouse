import { Schema, model } from "mongoose";

const chatSchema = new Schema({
  author: {
    id: { type: String },
    nombre: { type: String, required: true },
    apellido: { type: String },
    edad: { type: Number },
    alias: { type: String },
    avatar: { type: String },
  },
  text: { type: String },
  timestamp: { type: String },
});
const Chat = model("chat", chatSchema);

export default Chat;
