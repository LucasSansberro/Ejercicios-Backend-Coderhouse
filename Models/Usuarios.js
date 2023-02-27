import { Schema, model} from "mongoose";

const UsuarioSchema = new Schema({
  username: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 100 },
  nombre: { type: String, required: true, max: 100 },
  direccion: { type: String, required: true, max: 200 },
  edad: { type: Number, required: true, min: 0 },
  telefono: { type: String, required: true, max: 100 },
  avatar: { type: String, required: true, max: 500 },
  carrito_id: { type: String, required: true, max: 500 },
});

const Usuarios = model("usuarios", UsuarioSchema);

export default Usuarios;
