import "dotenv/config.js";

const ENV = {
  MONGOURL: process.env.URLMONGO,
  PORT: process.env.PORT,
  NODEMAILER_MAIL: process.env.NODEMAILER_MAIL,
  NODEMAILER_PASS: process.env.NODEMAILER_PASS,
  TWILIO_AUTHTOKEN: process.env.TWILIO_AUTHTOKEN,
  TWILIO_ACCOUNTSID: process.env.TWILIO_ACCOUNTSID,
  MODE: process.env.MODE
};

export default ENV;
