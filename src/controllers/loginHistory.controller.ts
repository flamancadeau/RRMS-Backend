import { Request, Response } from "express";
import * as loginHistoryService from "../services/loginHistory.service";

/**
 * Create LoginHistory
 */
export const createLoginHistory = async (
  req: Request,
  res: Response
) => {
  const loginHistory = await loginHistoryService.createLoginHistory(req.body);

  return res.status(201).json({
    success: true,
    message: "LoginHistory created successfully",
    data: loginHistory,
  });
};

/**
 * Get all LoginHistorys
 */
export const getLoginHistorys = async (
  req: Request,
  res: Response
) => {
  const items = await loginHistoryService.getLoginHistorys();

  return res.status(200).json({
    success: true,
    data: items,
  });
};

/**
 * Get LoginHistory by ID
 */
export const getLoginHistory = async (
  req: Request,
  res: Response
) => {
  const loginHistory = await loginHistoryService.getLoginHistory(
    req.params.id
  );

  return res.status(200).json({
    success: true,
    data: loginHistory,
  });
};

/**
 * Update LoginHistory
 */
export const updateLoginHistory = async (
  req: Request,
  res: Response
) => {
  const loginHistory = await loginHistoryService.updateLoginHistory(
    req.params.id,
    req.body
  );

  return res.status(200).json({
    success: true,
    message: "LoginHistory updated successfully",
    data: loginHistory,
  });
};

/**
 * Delete LoginHistory
 */
export const deleteLoginHistory = async (
  req: Request,
  res: Response
) => {
  await loginHistoryService.deleteLoginHistory(req.params.id);

  return res.status(200).json({
    success: true,
    message: "LoginHistory deleted successfully",
  });
};

/**
 * Restore LoginHistory
 */
export const restoreLoginHistory = async (
  req: Request,
  res: Response
) => {
  const loginHistory = await loginHistoryService.restoreLoginHistory(
    req.params.id
  );

  return res.status(200).json({
    success: true,
    message: "LoginHistory restored successfully",
    data: loginHistory,
  });
};
