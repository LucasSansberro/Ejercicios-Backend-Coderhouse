const request = require("supertest")("http://localhost:8080");
const expect = require("chai").expect;
const faker = require("@faker-js/faker").faker;
const generatePost = () => {
  return {
    price: faker.commerce.price(1, 1000, 2, ""),
    title: faker.commerce.product(),
    timestamp: new Date().toLocaleString(),
    description: faker.commerce.productDescription(),
    code: faker.commerce.productMaterial(),
    thumbnail: faker.image.food(640, 480, true),
  };
};

describe("Test all products endpoint", () => {
  //GET
  describe("GET ALL", () => {
    it("Deberia responder con status 200 y ser array", async () => {
      const res = await request.get("/api/productos");
      expect(res.status).to.eql(200);
      expect(res.body.products).to.be.a("array");
    });
    it("Deberia responder con status 200 y ser array", async () => {
      const res = await request.get("/api/productos/random");
      expect(res.status).to.eql(200);
      expect(res.body.products).to.be.a("array");
    });
  });

  //POST
  describe("POST ONE AND MANY", () => {
    it("Deberia incorporar un posteo nuevo", async () => {
      const post = generatePost();
      const res = await request.post("/api/productos").send(post);
      expect(res.status).to.eql(200);
      expect(res.body).to.be.a("object");
      expect(res.body).to.include.keys("msg");
      expect(post.body).to.eql(res.body.body);
    });
    it("Deberia incorporar cinco posteos nuevos", async () => {
      const res = await request.post("/api/productos/random").send();
      expect(res.status).to.eql(200);
      expect(res.body).to.be.a("object");
      expect(res.body).to.include.keys("msg");
    });
  });
});
