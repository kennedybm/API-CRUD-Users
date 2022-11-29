import { Request, Response } from "express";
import createUseService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import listUserByIdService from "../services/users/listUserById.service";
import listUsersService from "../services/users/listUsers.service";
import updateUSerService from "../services/users/updateUser.service";

const createUserController = async (req: Request, res: Response) => {
  const { name, email, password, age } = req.body;
  const newUser = await createUseService({ name, email, password, age });
  return res.status(201).json(newUser);
};

const listUSersController = async (req: Request, res: Response) => {
  const users = await listUsersService();
  return res.json(users);
};

const listUserByIdController = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await listUserByIdService(userId);
  return res.json(user);
};

const updateUserController = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const { name, email, password } = req.body;
  const updated = await updateUSerService(userId, { name, email, password });
  return res.status(200).json({
    message: "Updated with success!",
  });
};

const deleteUserController = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const deleted = await deleteUserService(userId);
  return res.status(200).json({
    message: "User deleted with success!",
  });
};

export {
  createUserController,
  listUSersController,
  listUserByIdController,
  updateUserController,
  deleteUserController,
};
