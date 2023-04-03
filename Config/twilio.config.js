import twilio from "twilio";
import ENV from "./env.config.js";
import { errorLogger, warnLogger } from "./logger.config.js";

const accountSid = ENV.TWILIO_ACCOUNTSID;
const authToken = ENV.TWILIO_AUTHTOKEN;
const client = twilio(accountSid, authToken);

const sendPhoneMsg = async (num) => {
  try {
    await client.messages.create({
      body: "Su pedido se ha recibido y se encuentra en proceso",
      from: "+12708175580",
      to: `+${num}`,
    });
    warnLogger.info("Mensaje de texto enviado al comprador");
  } catch (error) {
    errorLogger.log(error);
  }
};

const sendWhatsAppMsg = async (body) => {
  try {
    await client.messages.create({
      body: body,
      from: "whatsapp:+14155238886",
      to: "whatsapp:+5491168793593",
    });
    warnLogger.info("Mensaje de Whatsapp enviado al administrador");
  } catch (error) {
    errorLogger.log(error);
  }
};

export { sendPhoneMsg, sendWhatsAppMsg };
