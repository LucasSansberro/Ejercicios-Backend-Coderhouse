import { getInfoUser, getAllInfoUser } from "../Services/usuarios.service.js";

const userAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/loginError");
  }
};

const getRegisterController = (req, res) => {
  if (req.isAuthenticated()) {
    const user = getInfoUser(req);
    res.render("form", { user });
  } else {
    res.render("register");
  }
};

const postRegisterController = (req, res) => {
  const user = getInfoUser(req);
  res.render("form", { user });
};

const getRegisterErrorAuthController = (req, res) => {
  res.render("registerErrorAuth");
};

const getLoginController = (req, res) => {
  if (req.isAuthenticated()) {
    const user = getInfoUser(req);
    res.render("form", { user });
  } else {
    res.render("login");
  }
};

const postLoginController = (req, res) => {
  const user = getInfoUser(req);
  res.render("form", { user });
};

const getLoginErrorController = (req, res) => {
  res.render("loginError");
};

const getLoginErrorAuthController = (req, res) => {
  res.render("loginErrorAuth");
};

const getInfoController = async (req, res) => {
  const { user, productos } = await getAllInfoUser(req);
  res.render("user-info", { user, productos });
};

const getLogoutController = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
  res.render("login");
};

export {
  userAuth,
  getRegisterController,
  postRegisterController,
  getRegisterErrorAuthController,
  getLoginController,
  postLoginController,
  getLoginErrorController,
  getLoginErrorAuthController,
  getLogoutController,
  getInfoController,
};
