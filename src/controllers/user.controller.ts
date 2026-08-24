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