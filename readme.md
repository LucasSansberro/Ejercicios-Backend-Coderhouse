# Entrega 14

![Ejercicio redactado](./Pics/entrega-15-imagen-1.png)

![Ejercicio redactado](./Pics/entrega-15-imagen-2.png)

![Ejercicio redactado](./Pics/entrega-15-imagen-3.png)

![Ejercicio redactado](./Pics/entrega-15-imagen-4.png)

![Listado de PM2](./Pics/entrega-15-imagen-5.png)

![Consola mostrando el funcionamiento de Nginx](./Pics/entrega-15-imagen-6.png)

![/api/randoms funcionando con nginx y balanceo de carga](./Pics/entrega-15-imagen-7.png)

## Comenzar el servidor con los siguientes comandos

```console
pm2 start expressServer.js --name="general" -i 1

pm2 start expressServer.js --name="fork" -- --port 8081

pm2 start expressServer.js --name="Cluster1" -i 1 -- --port 8082

pm2 start expressServer.js --name="Cluster2" -i 1 -- --port 8083

pm2 start expressServer.js --name="Cluster3" -i 1 -- --port 8084

pm2 start expressServer.js --name="Cluster4" -i 1 -- --port 8085
```
