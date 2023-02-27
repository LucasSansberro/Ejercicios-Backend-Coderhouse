//Modos de arranque:
// 1 - Normal: nodemon expressServer.js --port 8079
// 2 - PM2 con cluster: pm2 start expressServer.js --name="Cluster4" -i 1 -- --port 8085
// 3 - PM2 con fork:  pm2 start expressServer.js --name="Fork" -- --port 8081
//Para que nginx y el balanceo funcionen correctamente tenemos que tener los puertos del 8080 al 8085 abiertos
import initArgs from "minimist";
const options = { default: { port: 8080 } };
const initOptions = initArgs(process.argv.slice(2), options);

export default initOptions;
