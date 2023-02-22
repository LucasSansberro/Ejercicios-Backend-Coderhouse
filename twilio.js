const twilio = require("twilio");

const accountSid = "AC2cf0b6aec061eafa733fdde59eff39ea";
const authToken = process.env.AUTHTOKEN

const client = twilio(accountSid, authToken);

const sendPhoneMsg = async (num) => {
  try {
    const message = await client.messages.create({
      body: "Su pedido se ha recibido y se encuentra en proceso",
      from: "+12708175580",
      to: `+${num}`,
    });
    console.log(message);
  } catch (error) {
    console.log(error);
  }
};

const sendWhatsAppMsg = async (body) => {
  try {
    const message = await client.messages.create({
      body: body,
      from: "whatsapp:+14155238886",
      to: "whatsapp:+5491168793593",
    });
    console.log(message);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {sendPhoneMsg, sendWhatsAppMsg}
