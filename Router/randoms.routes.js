import { Router } from "express";
import { getRandomInfoController, getRandomNumbersController } from "../Controller/randoms.controller.js";

const routerRandoms = new Router();

routerRandoms.get("/info", getRandomInfoController);
routerRandoms.get("/randomNumber", getRandomNumbersController);

app.get(`/api/randoms`);

export default routerRandoms;
