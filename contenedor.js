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
      const idNumber = previousDataHolder[previousDataHolder.length - 1].id;
      if (idNumber !== undefined) {
        this.array = [...previousDataHolder, { ...objeto, id: idNumber + 1 }];
      } else if (previousDataHolder[0].id !== 1) {
        this.array = [
          { ...previousDataHolder, id: 1 },
          { ...objeto, id: 2 },
        ];
      }
      console.log("Ya existe un archivo con ese nombre. Agregando objeto");
      try {
        fs.writeFileSync(
          `./${this.archivo}.txt`,
          JSON.stringify(this.array, null, 2)
        ); //Async o sync? Siento que en este punto no hace diferencia
        console.log("El objeto ha sido agregado con éxito");
      } catch {
        console.log("Error en la escritura");
      }
    } catch {
      this.array = [{ ...objeto, id: 1 }];
      fs.writeFileSync(
        `./${this.archivo}.txt`,
        JSON.stringify(this.array, null, 2)
      );
      console.log("Archivo creado con éxito");
    }
  }
  getById(id) {
    try {
      const previousData = fs.readFileSync(`./${this.archivo}.txt`, "utf-8");
      const previousDataHolder = JSON.parse(previousData);
      return previousDataHolder.find((element) => element.id === id) || null;
    } catch {
      return "No se ha podido acceder al archivo";
    }
  }
  getAll() {
    try {
      const previousData = fs.readFileSync(`./${this.archivo}.txt`, "utf-8");
      return JSON.parse(previousData);
    } catch {
      return "No se ha podido acceder al archivo";
    }
  }
  async deleteById(id) {
    try {
      const previousData = await fs.promises.readFile(
        `./${this.archivo}.txt`,
        "utf-8"
      );
      const previousDataHolder = JSON.parse(previousData);
      if (previousDataHolder.some((element) => element.id === id)) {
        const filteredArray = previousDataHolder.filter(
          (element) => element.id !== id
        );
        fs.writeFileSync(
          `./${this.archivo}.txt`,
          JSON.stringify(filteredArray, null, 2)
        );
        console.log("El objeto ha sido removido con éxito");
      } else {
        console.log("No se ha encontrado un objeto con ese ID");
      }
    } catch {
      console.log("No se ha podido acceder al archivo");
    }
  }
  async deleteAll() {
    try {
      await fs.promises.readFile(`./${this.archivo}.txt`, "utf-8");
      try {
        fs.writeFileSync(`./${this.archivo}.txt`, "");
        console.log("El contenido ha sido eliminado con éxito");
      } catch {
        console.log("Error. El contenido no se ha podido eliminar");
      }
    } catch {
      console.log("No existe un archivo con ese nombre");
    }
  }
}

const productos = new Contenedor("productos");
module.exports = { Contenedor };

//Prueba de métodos
/*  productos.save({
  title: "Leche",
  price: 200,
  thumbnail:
    "https://www.laserenisima.com.ar/images/productos/grandesachet3.png",
}); */
/*  productos.save({
  title: "Aceite",
  price: 500,
  thumbnail:
    "https://jumboargentina.vtexassets.com/arquivos/ids/427751/Aceite-De-Girasol-Natura-15-L-1-247928.jpg?v=636495154762100000",
});  */
 /* productos.save({
  title: "Manteca",
  price: 200,
  thumbnail:
    "https://carrefourar.vtexassets.com/arquivos/ids/181159/7790398100088_02.jpg?v=637468586717300000",
});  */
/* console.log(productos.getById(3));
console.log(productos.getById(15)); */
/* console.log(productos.getAll()); */
/* productos.deleteById(3) */
/* productos.deleteAll();  */
