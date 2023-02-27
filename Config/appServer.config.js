import "dotenv/config.js";
import express from "express";
import compression from "compression";
import http from "http";
import { warnLogger } from "./logger.config.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use((req, res, next) => {
  warnLogger.info({ metodo: req.method, path: req.path });
  next();
});

const httpServer = http.createServer(app);

export { app, httpServer };
