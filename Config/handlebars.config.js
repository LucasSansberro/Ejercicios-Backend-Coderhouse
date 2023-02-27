import { engine } from "express-handlebars";
import app from "./appServer.config";

app.set("view engine", "hbs");
app.set("views", "../views");
app.use(express.static("../images"));
app.use(express.static("public"));
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layout",
    partialsDir: __dirname + "/views/partials",
  })
);
