import ContenedorMongo from "./mongoDAO.js";
import ContenedorMem from "./memDAO.js";
import Carrito from "../Models/Carrito.js";
import Productos from "../Models/Productos.js";


 let DAO;
let productosArray = [
  {
    id: 1,
    title: "Leche",
    description: "Leche La Serenísima con 3% - 1 lt",
    code: "LeSe1",
    price: 200,
    stock: 10,
    thumbnail: "https://www.laserenisima.com.ar/images/productos/grandesachet3.png",
    timestamp: "21/11/2022, 21:50:10",
  },
  {
    id: 2,
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
    id: 3,
    title: "Aceite",
    description: "Aceite de girasol Natura de litro y medio",
    code: "AcNa1",
    price: 500,
    stock: 15,
    thumbnail:
      "https://jumboargentina.vtexassets.com/arquivos/ids/427751/Aceite-De-Girasol-Natura-15-L-1-247928.jpg?v=636495154762100000",
    timestamp: "12/2/2023, 17:40:32",
  },
];
const modo = "mem";
if (modo == "mongo") {
  DAO = { carrito: new ContenedorMongo(Carrito), productos: new ContenedorMongo(Productos) };
} else if (modo == "mem") {
  DAO = { carrito: new ContenedorMem(Carrito), productos: new ContenedorMem(productosArray) };
}
DAO.productos.getAll()
export default DAO