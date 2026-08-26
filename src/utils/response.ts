import { Response } from "express";

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T
) => {
  return res.status(statusCode).json({
    success: statusCode < 400,
    message,
    data,
  });
};

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message = "Success",
  statusCode = 200
) => {
  return sendResponse(res, statusCode, message, data);
};

export const sendError = (
  res: Response,
  message = "Something went wrong",
  statusCode = 500,
  errors?: unknown[]
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};