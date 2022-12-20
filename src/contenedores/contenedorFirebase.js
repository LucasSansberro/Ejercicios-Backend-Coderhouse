const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../privi.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = getFirestore();

//Contenedor
class Contenedor {
  constructor(collection) {
    this.collection = collection;
  }
  async save(objeto) {
    try {
      await db.collection(this.collection).doc().set(objeto);
      return "Object saved";
    } catch {
      return "There was an error accessing the Database";
    }
  }
  async editById(id, objeto) {
    try {
      const findObject = db.collection(this.collection).doc(id);
      await findObject.update(objeto);
      return "Object updated";
    } catch {
      ("There was an error accessing the Database");
    }
  }
  async getById(id) {
    try {
      const res = await db.collection(this.collection).get();
      let arrayRes = res.docs.map((item) => {
        return { id: item.id, ...item.data() };
      });
      const data = arrayRes.filter((res) => res.id == id);
      return data;
    } catch {
      return "There was an error accessing the Database";
    }
  }
  async getAll() {
    try {
      const res = await db.collection(this.collection).get();
      let arrayRes = res.docs.map((item) => {
        return { id: item.id, ...item.data() };
      });
      return arrayRes;
    } catch {
      return "There was an error accessing the Database";
    }
  }
  async deleteById(id) {
    try {
      await db.collection(this.collection).doc(id).delete();
      return "Object deleted";
    } catch {
      return "There was an error accessing the Database";
    }
  }
  async deleteAll() {
    try {
      await db.collection(this.collection).doc().delete();
      return "Objects deleted";
    } catch {
      return "There was an error accessing the Database";
    }
  }
}

module.exports = { Contenedor };

/* const test = new Contenedor("productos"); */
/* test.save({
  title: "Leche",
  description: "Leche La Serenísima con 3% - 1 lt",
  code: "LeSe1",
  price: 200,
  stock: 10,
  thumbnail:
    "https://www.laserenisima.com.ar/images/productos/grandesachet3.png",
  timestamp: "21/11/2022, 21:50:10",
});
 */
/* test.getAll().then((res) => console.log(res)); */
/* test.editById("yDk1144AS9bO3R3eVc6C", { title: "Leche" }); */
/* test.getById("yDk1144AS9bO3R3eVc6C").then((res) => console.log(res)); */
/* test.deleteById("Qhe4wCyrI1kFuygntzCD") */
