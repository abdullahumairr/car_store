import express from "express";
import {
  createCarHandler,
  deleteCarHandler,
  getAllCarsHandler,
  getCarByIdHandler,
  updateCarHandler,
} from "../controllers/carController.js";
import { upload } from "../config/upload.js";
import { verifyToken } from "../middlewares/auth.js";
const carRouter = express.Router();

carRouter.get("/cars", getAllCarsHandler);
carRouter.get("/cars/:id", getCarByIdHandler);
carRouter.post(
  "/cars",
  verifyToken,
  upload.array("images", 10),
  createCarHandler
);
carRouter.put(
  "/cars/:id",
  verifyToken,
  upload.array("images", 10),
  updateCarHandler
);
carRouter.delete("/cars/:id", deleteCarHandler);

export default carRouter;
