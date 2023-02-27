import { Router } from "express";
import passport from "passport";
import upload from "../Config/multer.config.js";
import {
  getRegisterController,
  postRegisterController,
  getRegisterErrorAuthController,
  getLoginController,
  postLoginController,
  getLoginErrorController,
  getLoginErrorAuthController,
  getLogoutController,
  getInfoController,
  userAuth,
} from "../Controller/usuarios.controller.js";

const routerUsuarios = new Router();

routerUsuarios.get("/register", getRegisterController);
routerUsuarios.post(
  "/register",
  upload.single("thumbnail"),
  passport.authenticate("signup", { failureRedirect: "/registerErrorAuth" }),
  postRegisterController
);
routerUsuarios.get("/registerErrorAuth", getRegisterErrorAuthController);

routerUsuarios.get("/login", getLoginController);
routerUsuarios.post(
  "/login",
  upload.single("thumbnail"),
  passport.authenticate("login", { failureRedirect: "/loginErrorAuth" }),
  postLoginController
);
routerUsuarios.get("/loginError", getLoginErrorController);
routerUsuarios.get("/loginErrorAuth", getLoginErrorAuthController);

routerUsuarios.get("/info", userAuth, getInfoController);

routerUsuarios.post("/logout", getLogoutController);

export default routerUsuarios;
