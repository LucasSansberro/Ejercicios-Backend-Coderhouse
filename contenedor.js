const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
    this.array = [];
  }
  async save(objeto) {
    try {
      const previousData = await fs.promises.readFile(
        `./${this.archivo}.txt`,
        "utf-8"
      );
      const previousDataHolder = JSON.parse(previousData);
      //Este JSON parse no me termina de convencer. Si es un string entre comillas le hace un split. Para archivos grandes puede ser un problema
      //Si es un string sin comillas (También entraría acá un objeto sin las llaves de cierre, por ejemplo) simplemente lo sobreescribe
      //Más allá de eso, la función cumple su cometido y no creo que tenga sentido comerme más la cabeza, siendo que ya estuve varias horas sin poder solucionarlo
      //Un condicional que haga append arreglaría bastante, pero el ID en el array empeoraría su funcionalidad. Podría solucionarlo con un incrementador++, pero se termina alejando de lo que busco
      previousDataHolder[0].id == 1
        ? (this.array = [
            ...previousDataHolder,
            { ...objeto, id: previousDataHolder.length + 1 },
          ])
        : (array = [
            { ...previousDataHolder, id: 1 },
            { ...objeto, id: 2 },
          ]);
      const textArray = JSON.stringify(this.array);
      console.log("Ya existe un archivo con ese nombre. Agregando objeto");
      try {
        await fs.promises.writeFile(`./${this.archivo}.txt`, textArray);
        console.log("El objeto ha sido agregado con éxito");
      } catch {
        console.log("Error en la escritura");
      }
    } catch {
      this.array = [{ ...objeto, id: 1 }];
      const textArray = JSON.stringify(this.array);
      await fs.promises.writeFile(`./${this.archivo}.txt`, textArray);
      console.log("Archivo creado con éxito");
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
}

const lucasTest = new Contenedor("test");
lucasTest.save({ nombre: "Lucas", apellido: "Pepe" });
