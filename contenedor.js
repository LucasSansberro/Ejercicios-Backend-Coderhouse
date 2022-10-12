const fs = require("fs");

/* class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
    this.array = [];
  }
  async save(clave, valor) {
    //Guardar objeto en el archivo. Devuelve un id asignado (Tiene que ser el index + 1)
    const texto = { clave: clave, valor: valor };
    this.array = [...array, { ...texto, id: array.length + 1 }];
    const json = JSON.stringify(this.array);
    try {
      await fs.promises.writeFile(`./${this.archivo}.txt`, json);
    } catch (err) {
      console.log("Hubo un error al agregar el objeto al archivo", err);
    }
  }
  getById(id) {
    //Devuelve el objeto con ese id o null, si es que no hay un objeto asociado a tal id
  }
  getAll() {
    //Devuelve un array con todos los objetos del archivo
  }
  deleteById(id) {
    //Elimina el objeto con tal id
  }
  deleteAll() {
    //Elimina todos los objetos del archivo
  }
} */

/* const test = new Contenedor("prueba");
console.log(test);
test.save("Test", "Test2");
console.log(test); */

/* let array = [];
const texto = { nombre: "Pepe", apellido: "Pepardo" };
array = [...array, { ...texto, id: array.length + 1 }];
array = [...array, { ...texto, id: array.length + 1 }];
const json = JSON.stringify(array);

fs.writeFileSync("./test.txt", json);
const datos = fs.readFileSync("./test.txt", "utf-8");
console.log(datos); */

async function testLectura() {
  let array = [];
  const texto = { nombre: "Pepe", apellido: "Pepardo" };
  try {
    const data = await fs.promises.readFile("./test.txt", "utf-8");
    const test = JSON.parse(data);
    test[0].id
      ? (array = [...test, { ...texto, id: test.length + 1 }])
      : (array = [
          { ...test, id: 1 },
          { ...texto, id: 2 },
        ]);
    const json = JSON.stringify(array);
    console.log("Ya existe un archivo con ese nombre. Agregando objeto");
    try {
      fs.unlinkSync("./test.txt");
      fs.writeFileSync("./test.txt", json);
      console.log("El objeto ha sido agregado con éxito");
    } catch {
      console.log("Error en la escritura");
    }
  } catch {
    array = [{ ...texto, id: 1 }];
    const json = JSON.stringify(array);
    fs.writeFileSync("./test.txt", json);
    console.log("Archivo creado con éxito");
  }
}
testLectura();
