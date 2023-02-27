import MongoStore from "connect-mongo";
import session from "express-session";
import app from "./appServer.config";

const mongoURL = process.env.URLMONGO;

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
