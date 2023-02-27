import io from "socket.io";
import httpServer from "./appServer.config";
import normalizeChat from "./Services/normalizr.js";
import Contenedor from "../DB/mongoDAO.js";
import Productos from "../Models/Productos.js";

const productos = new Contenedor(Productos);

const io = io(httpServer);

io.on("connection", async (socket) => {
  const allProducts = await productos.getAll();
  io.sockets.emit("lastProducts", allProducts);

  const chat = await chatLog.getAll();
  const normalizedChat = normalizeChat(chat);
  socket.emit("chat", normalizedChat);

  socket.on("userMsg", async (data) => {
    await chatLog.save(data);
    const chat = await chatLog.getAll();
    const normalizedChat = normalizeChat(chat);
    io.sockets.emit("chat", normalizedChat);
  });
});
