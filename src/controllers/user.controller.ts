import { Request, Response } from "express";
import * as userService from "../services/ user.service";

export const createUser = async (
  req: Request,
  res: Response
) => {
  const user = await userService.createUser(req.body);

  return res.status(201).json({
    success: true,
    message: "User created successfully",
    data: user,
  });
};


export const getUsers = async (req: Request, res: Response) => {
  const users = await userService.getUsers();

  return res.status(200).json({
    success: true,
    message: "Users retrieved successfully",
    data: users,
  });
};

export const getUser = async (req: Request, res: Response) => {
  const user = await userService.getUser(req.params.id);

  return res.status(200).json({
    success: true,
    message: "User retrieved successfully",
    data: user,
  });
};

export const deleteUser = async (req: Request, res: Response) => {
  await userService.deleteUser(req.params.id);

  return res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
};


export const updateUser = async (req: Request, res: Response) => {
  const user = await userService.updateUser(
    req.params.id,
    req.body,
  );

  return res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: user,
  });
};
