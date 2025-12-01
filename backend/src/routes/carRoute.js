import express from "express";
import { createCarHandler, deleteCarHandler, getAllCarsHandler, updateCarHandler } from "../controllers/carController.js";
import { getCarByIdHandler } from "../services/carService.js";

const carRouter = express.Router();

carRouter.get("/cars", getAllCarsHandler);
carRouter.get("/cars/:id", getCarByIdHandler);
carRouter.post("/cars", createCarHandler);
carRouter.put("/cars/:id", updateCarHandler);
carRouter.delete("/cars/:id", deleteCarHandler);

export default carRouter;
