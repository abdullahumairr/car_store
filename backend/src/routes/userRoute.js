import express from "express";
import {
  createUsersHandler,
  deleteUsersHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUsersHandler,
} from "../controllers/userController.js";

const useRouter = express.Router();

useRouter.get("/users", getAllUsersHandler);
useRouter.get("/users/:id", getUserByIdHandler);
useRouter.post("/users", createUsersHandler);
useRouter.put("/users/:id", updateUsersHandler);
useRouter.delete("/users/:id", deleteUsersHandler);

export default useRouter;
