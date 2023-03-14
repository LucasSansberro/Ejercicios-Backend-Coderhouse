import express from "express";
import compression from "compression";
import http from "http";
import { warnLogger } from "./logger.config.js";
import "./passport.config.js";
import MongoStore from "connect-mongo";
import session from "express-session";
import passport from "passport";
import { engine } from "express-handlebars";
import ENV from "./env.config.js";

const app = express();
const httpServer = http.createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use((req, res, next) => {
  warnLogger.info({ metodo: req.method, path: req.path });
  next();
});

const mongoURL = ENV.MONGOURL
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: mongoURL,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      cookie: {
        maxAge: 60000 * 60 * 24,
      },
    }),
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.static("public"));
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: path.join(__dirname, "../views/layout"),
    partialsDir: path.join(__dirname, "../views/partials"),
  })
);

import {Server} from "socket.io";
import normalizeChat from "./normalizr.config.js";
import Contenedor from "../DB/mongoDAO.js";
import Productos from "../Models/Productos.js";
import Chat from "../Models/Chat.js"

const productos = new Contenedor(Productos);
const chatLog = new Contenedor(Chat)
const io = new Server(httpServer);

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

export { app, httpServer };
