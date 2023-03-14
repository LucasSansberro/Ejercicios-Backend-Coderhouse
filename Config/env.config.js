import "dotenv/config.js";

const ENV = {
  MONGOURL: process.env.URLMONGO,
  AUTHTOKEN: process.env.AUTHTOKEN,
};

export default ENV;
