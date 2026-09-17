import { Request, Response } from "express";
import * as auditLogService from "../services/auditLog.service";

/**
 * Create AuditLog
 */
export const createAuditLog = async (
  req: Request,
  res: Response
) => {
  const auditLog = await auditLogService.createAuditLog(req.body);

  return res.status(201).json({
    success: true,
    message: "AuditLog created successfully",
    data: auditLog,
  });
};

/**
 * Get all AuditLogs
 */
export const getAuditLogs = async (
  req: Request,
  res: Response
) => {
  const items = await auditLogService.getAuditLogs();

  return res.status(200).json({
    success: true,
    data: items,
  });
};

/**
 * Get AuditLog by ID
 */
export const getAuditLog = async (
  req: Request,
  res: Response
) => {
  const auditLog = await auditLogService.getAuditLog(
    req.params.id
  );

  return res.status(200).json({
    success: true,
    data: auditLog,
  });
};

/**
 * Update AuditLog
 */
export const updateAuditLog = async (
  req: Request,
  res: Response
) => {
  const auditLog = await auditLogService.updateAuditLog(
    req.params.id,
    req.body
  );

  return res.status(200).json({
    success: true,
    message: "AuditLog updated successfully",
    data: auditLog,
  });
};

/**
 * Delete AuditLog
 */
export const deleteAuditLog = async (
  req: Request,
  res: Response
) => {
  await auditLogService.deleteAuditLog(req.params.id);

  return res.status(200).json({
    success: true,
    message: "AuditLog deleted successfully",
  });
};

/**
 * Restore AuditLog
 */
export const restoreAuditLog = async (
  req: Request,
  res: Response
) => {
  const auditLog = await auditLogService.restoreAuditLog(
    req.params.id
  );

  return res.status(200).json({
    success: true,
    message: "AuditLog restored successfully",
    data: auditLog,
  });
};
