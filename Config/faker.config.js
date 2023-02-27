import { faker } from "@faker-js/faker";
faker.locale = "es";

let timestamp = new Date().toLocaleString();
const createRandomProduct = () => {
  return {
    price: faker.commerce.price(1, 1000, 2, ""),
    title: faker.commerce.product(),
    timestamp,
    description: faker.commerce.productDescription(),
    code: faker.commerce.productMaterial(),
    thumbnail: faker.image.food(640, 480, true),
  };
};

const createNProducts = (array, number) => {
  for (let index = 0; index < number; index++) {
    array.push(createRandomProduct());
  }
};

export default createNProducts;
