import { Request, Response } from "express";
import * as transferHistoryService from "../services/transferHistory.service";

/**
 * Create TransferHistory
 */
export const createTransferHistory = async (
  req: Request,
  res: Response
) => {
  const transferHistory = await transferHistoryService.createTransferHistory(req.body);

  return res.status(201).json({
    success: true,
    message: "TransferHistory created successfully",
    data: transferHistory,
  });
};

/**
 * Get all TransferHistorys
 */
export const getTransferHistorys = async (
  req: Request,
  res: Response
) => {
  const items = await transferHistoryService.getTransferHistorys();

  return res.status(200).json({
    success: true,
    data: items,
  });
};

/**
 * Get TransferHistory by ID
 */
export const getTransferHistory = async (
  req: Request,
  res: Response
) => {
  const transferHistory = await transferHistoryService.getTransferHistory(
    req.params.id
  );

  return res.status(200).json({
    success: true,
    data: transferHistory,
  });
};

/**
 * Update TransferHistory
 */
export const updateTransferHistory = async (
  req: Request,
  res: Response
) => {
  const transferHistory = await transferHistoryService.updateTransferHistory(
    req.params.id,
    req.body
  );

  return res.status(200).json({
    success: true,
    message: "TransferHistory updated successfully",
    data: transferHistory,
  });
};

/**
 * Delete TransferHistory
 */
export const deleteTransferHistory = async (
  req: Request,
  res: Response
) => {
  await transferHistoryService.deleteTransferHistory(req.params.id);

  return res.status(200).json({
    success: true,
    message: "TransferHistory deleted successfully",
  });
};

/**
 * Restore TransferHistory
 */
export const restoreTransferHistory = async (
  req: Request,
  res: Response
) => {
  const transferHistory = await transferHistoryService.restoreTransferHistory(
    req.params.id
  );

  return res.status(200).json({
    success: true,
    message: "TransferHistory restored successfully",
    data: transferHistory,
  });
};
