import express from "express";
import {
  createCarHandler,
  deleteCarHandler,
  getAllCarsHandler,
  getCarByIdHandler,
  updateCarHandler,
} from "../controllers/carController.js";
import { verifyToken } from "../middlewares/auth.js";
const carRouter = express.Router();

carRouter.get("/cars", getAllCarsHandler);
carRouter.get("/cars/:id", getCarByIdHandler);
carRouter.post("/cars", verifyToken, createCarHandler);
carRouter.put("/cars/:id", verifyToken, updateCarHandler);
carRouter.delete("/cars/:id", verifyToken, deleteCarHandler);



export default carRouter;
