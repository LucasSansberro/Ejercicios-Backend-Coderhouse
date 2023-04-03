import ContenedorMongo from "./mongoDAO.js";
import ContenedorMem from "./memDAO.js";
import Carrito from "../Models/Carrito.js";
import Productos from "../Models/Productos.js";

let DAO;
let productosArray = [
  {
    _id: 1,
    title: "Leche",
    description: "Leche La Serenísima con 3% - 1 lt",
    code: "LeSe1",
    price: 200,
    stock: 10,
    thumbnail: "https://www.laserenisima.com.ar/images/productos/grandesachet3.png",
    timestamp: "21/11/2022, 21:50:10",
  },
  {
    _id: 2,
    title: "Aceite",
    description: "Aceite de girasol Natura de litro y medio",
    code: "AcNa1",
    price: 500,
    stock: 15,
    thumbnail:
      "https://jumboargentina.vtexassets.com/arquivos/ids/427751/Aceite-De-Girasol-Natura-15-L-1-247928.jpg?v=636495154762100000",
    timestamp: "12/2/2023, 17:40:32",
  },
  {
    _id: 3,
    title: "Manteca",
    description: "Manteca La Paulina - 200gr",
    code: "AcNa1",
    price: 200,
    stock: 8,
    thumbnail: "https://carrefourar.vtexassets.com/arquivos/ids/181159/7790398100088_02.jpg?v=637468586717300000",
    timestamp: "12/2/2023, 17:40:32",
  },
];
let carrito = [
  {
    _id: 1,
    productos: [
      {
        title: "Leche",
        description: "Leche La Serenísima con 3% - 1 lt",
        code: "LeSe1",
        price: 200,
        stock: 10,
        thumbnail: "https://www.laserenisima.com.ar/images/productos/grandesachet3.png",
        timestamp: "21/11/2022, 21:50:10",
        _id: 1,
      },
      {
        title: "Manteca",
        description: "Manteca La Paulina - 200gr",
        code: "MaPa1",
        price: 200,
        stock: 8,
        thumbnail: "https://carrefourar.vtexassets.com/arquivos/ids/181159/7790398100088_02.jpg?v=637468586717300000",
        timestamp: "20/12/2022, 10:26:42",
        _id: 2,
      },
      {
        title: "Aceite",
        description: "Aceite de girasol Natura de litro y medio",
        code: "AcNa1",
        price: 500,
        stock: 15,
        thumbnail:
          "https://jumboargentina.vtexassets.com/arquivos/ids/427751/Aceite-De-Girasol-Natura-15-L-1-247928.jpg?v=636495154762100000",
        timestamp: "12/2/2023, 17:40:32",
        _id: 3,
      },
    ],
  },
];

let modo = process.argv[2];
if (modo == "mongo") {
  DAO = { carrito: new ContenedorMongo(Carrito), productos: new ContenedorMongo(Productos) };
} else if (modo == "dev") {
  DAO = { carrito: new ContenedorMem(carrito), productos: new ContenedorMem(productosArray) };
} else {
  throw "Es necesario indicar el tipo de persistencia"
}
DAO.productos.getAll();
export default DAO;
