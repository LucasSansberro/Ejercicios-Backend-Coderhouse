import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import Usuarios from "../Models/Usuarios.js";
import { errorLogger, warnLogger } from "./logger.config.js";
import ContenedorMongo from "../DB/mongoDAO.js";
import Carrito from "../Models/Carrito.js";
import {sendMail} from "./nodemailer.config.js"

const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

const carritoMongoCreator = new ContenedorMongo(Carrito);

passport.use(
  "login",
  new Strategy((username, password, done) => {
    Usuarios.findOne({ username }, (err, user) => {
      if (err) return done(err);

      if (!user) {
        warnLogger.warn("User Not Found with username " + username);
        return done(null, false);
      }

      if (!isValidPassword(user, password)) {
        warnLogger.warn("Invalid Password");
        return done(null, false);
      }

      return done(null, user);
    });
  })
);

passport.use(
  "signup",
  new Strategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      Usuarios.findOne({ username: username }, async function (err, user) {
        if (err) {
          warnLogger.warn("Error in SignUp: " + err);
          return done(err);
        }

        if (user) {
          warnLogger.info("User already exists");
          return done(null, false);
        }

        //We create a shopping cart in the DB and we link its ID to the user data
        let timestamp = new Date().toLocaleString();
        const idNumber = await carritoMongoCreator.save({
          timestamp,
          productos: [],
        });

        const newUser = {
          username: username,
          password: createHash(password),
          nombre: req.body.nombre,
          direccion: req.body.direccion,
          edad: req.body.edad,
          telefono: req.body.telefono,
          avatar: req.body.avatar,
          carrito_id: idNumber,
        };
        sendMail(newUser);
        Usuarios.create(newUser, (err, userWithId) => {
          if (err) {
            errorLogger.log("Error in Saving user: " + err);
            return done(err);
          }
          warnLogger.info("User Registration succesful");
          return done(null, userWithId);
        });
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  Usuarios.findById(id, done);
});
