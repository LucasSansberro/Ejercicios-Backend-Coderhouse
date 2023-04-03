import { createTransport } from "nodemailer";
import ENV from "./env.config.js";
import { errorLogger, warnLogger } from "./logger.config.js";

const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: ENV.NODEMAILER_MAIL,
    pass: ENV.NODEMAILER_PASS,
  },
});

const sendMail = async (usuario) => {
  const mailOptions = {
    from: "Servidor Node.js",
    to: ENV.NODEMAILER_MAIL,
    subject: "Nuevo registro",
    html: `
    <h1>Nuevo usuario </h1>
    <ul style="list-style:none; display:flex; flex-direction:column; justify-content:space-between;"> 
    <li>Usuario: ${usuario.username}</li>
    <li>Nombre: ${usuario.nombre}</li>
    <li>Dirección: ${usuario.direccion}</li>
    <li>Edad: ${usuario.edad}</li>
    <li>Teléfono: ${usuario.telefono}</li>
    <li>Avatar: <img src=${usuario.avatar} alt="Avatar" style="height:150px; width:200px;margin-left:50px;"></li>
    </ul>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    warnLogger.info(info);
  } catch (err) {
    errorLogger.log("error", {
      mensaje: "Error in nodemailer sendMail",
    });
  }
};

const sendCartMail = async (user, carrito) => {
  let arrayItems = "";
  carrito.forEach((producto) => {
    arrayItems += `<h2>Producto </h2>
    <ul style="list-style:none; display:flex; flex-direction:column; justify-content:space-between;"> 
    <li>Producto: ${producto.title}</li>
    <li>Precio: $${producto.price}</li>
    </ul>`;
  });
  const mailOptions = {
    from: "Servidor Node.js",
    to: ENV.NODEMAILER_MAIL,
    subject: `Nuevo pedido de ${user}`,
    html: `<h1>Carrito </h1>: ${arrayItems}`,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    warnLogger.info(info);
  } catch (err) {
    errorLogger.log("error", {
      mensaje: "Error in nodemailer sendCartMail",
    });
  }
};

export { sendMail, sendCartMail };
