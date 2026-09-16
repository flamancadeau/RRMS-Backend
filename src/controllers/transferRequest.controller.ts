import { Request, Response } from "express";
import * as transferRequestService from "../services/transferRequest.service";

/**
 * Create TransferRequest
 */
export const createTransferRequest = async (
  req: Request,
  res: Response
) => {
  const transferRequest = await transferRequestService.createTransferRequest(req.body);

  return res.status(201).json({
    success: true,
    message: "TransferRequest created successfully",
    data: transferRequest,
  });
};

/**
 * Get all TransferRequests
 */
export const getTransferRequests = async (
  req: Request,
  res: Response
) => {
  const items = await transferRequestService.getTransferRequests();

  return res.status(200).json({
    success: true,
    data: items,
  });
};

/**
 * Get TransferRequest by ID
 */
export const getTransferRequest = async (
  req: Request,
  res: Response
) => {
  const transferRequest = await transferRequestService.getTransferRequest(
    req.params.id
  );

  return res.status(200).json({
    success: true,
    data: transferRequest,
  });
};

/**
 * Update TransferRequest
 */
export const updateTransferRequest = async (
  req: Request,
  res: Response
) => {
  const transferRequest = await transferRequestService.updateTransferRequest(
    req.params.id,
    req.body
  );

  return res.status(200).json({
    success: true,
    message: "TransferRequest updated successfully",
    data: transferRequest,
  });
};

/**
 * Delete TransferRequest
 */
export const deleteTransferRequest = async (
  req: Request,
  res: Response
) => {
  await transferRequestService.deleteTransferRequest(req.params.id);

  return res.status(200).json({
    success: true,
    message: "TransferRequest deleted successfully",
  });
};

/**
 * Restore TransferRequest
 */
export const restoreTransferRequest = async (
  req: Request,
  res: Response
) => {
  const transferRequest = await transferRequestService.restoreTransferRequest(
    req.params.id
  );

  return res.status(200).json({
    success: true,
    message: "TransferRequest restored successfully",
    data: transferRequest,
  });
};
