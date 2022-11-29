import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listUserByIdController,
  listUSersController,
  updateUserController,
} from "../controllers/user.controllers";
import authorizationMiddleware from "../middlewares/authorization.middleware";

const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get("", authorizationMiddleware, listUSersController);
userRoutes.get("/:userId", authorizationMiddleware, listUserByIdController);
userRoutes.patch("/:userId", authorizationMiddleware, updateUserController);
userRoutes.delete("/:userId", authorizationMiddleware, deleteUserController);

export default userRoutes;
