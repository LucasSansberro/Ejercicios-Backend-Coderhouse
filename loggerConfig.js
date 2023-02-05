const winston = require("winston");
const warnLogger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({ filename: "./logs/warn.log", level: "warn" }),
    new winston.transports.File({
      filename: "./logs/error.log",
      level: "error",
    }),
  ],
});

const errorLogger = winston.createLogger({
  level: "error",
  transports: [
    new winston.transports.Console({ level: "error" }),
    new winston.transports.File({
      filename: "./logs/error.log",
      level: "error",
    }),
  ],
});

module.exports = { warnLogger, errorLogger };
