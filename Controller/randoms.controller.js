import { getRandomNumbersService } from "../Services/randoms.service.js";

const getRandomInfoController = (req, res) => {
  res.json({
    "Argumentos de entrada": process.argv.slice(2),
    "Path de ejecución": process.argv[0],
    "Sistema operativo": process.platform,
    "ID del proceso": process.pid,
    "Versión de Node": process.version,
    "Carpeta del proyecto": process.cwd(),
    "Memoria total reservada": process.memoryUsage().rss,
  });
};

const getRandomNumbersController = (req, res) => {
  getRandomNumbersService(req);
  res.json({
    Numeros_generados:
      "Usted ha generado " +
      msg +
      " números. Estos, agrupados por repetición, generaron un array de " +
      arrayRepeatedResult.length +
      " elementos",
    numeros: arrayRepeatedResult,
  });
};

export { getRandomInfoController, getRandomNumbersController };
