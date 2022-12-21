const { faker } = require("@faker-js/faker");
faker.locale = "es";

let timestamp = new Date().toLocaleString();
const createRandomProduct = () => {
  return {
    price: faker.commerce.price(
      (min = 1),
      (max = 1000),
      (dec = 2),
      (symbol = "")
    ),
    title: faker.commerce.product(),
    timestamp,
    description: faker.commerce.productDescription(),
    code: faker.commerce.productMaterial(),
    thumbnail: faker.image.food(
      (width = 640),
      (height = 480),
      (randomize = true)
    ),
  };
};

const createNProducts = (array, number) => {
  for (let index = 0; index < number; index++) {
    array.push(createRandomProduct());
  }
};

module.exports = { createNProducts };
