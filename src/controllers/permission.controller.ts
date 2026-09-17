import { Request, Response } from "express";
import * as permissionService from "../services/permission.service";

/**
 * Create Permission
 */
export const createPermission = async (
  req: Request,
  res: Response
) => {
  const permission = await permissionService.createPermission(req.body);

  return res.status(201).json({
    success: true,
    message: "Permission created successfully",
    data: permission,
  });
};

/**
 * Get all Permissions
 */
export const getPermissions = async (
  req: Request,
  res: Response
) => {
  const items = await permissionService.getPermissions();

  return res.status(200).json({
    success: true,
    data: items,
  });
};

/**
 * Get Permission by ID
 */
export const getPermission = async (
  req: Request,
  res: Response
) => {
  const permission = await permissionService.getPermission(
    req.params.id
  );

  return res.status(200).json({
    success: true,
    data: permission,
  });
};

/**
 * Update Permission
 */
export const updatePermission = async (
  req: Request,
  res: Response
) => {
  const permission = await permissionService.updatePermission(
    req.params.id,
    req.body
  );

  return res.status(200).json({
    success: true,
    message: "Permission updated successfully",
    data: permission,
  });
};

/**
 * Delete Permission
 */
export const deletePermission = async (
  req: Request,
  res: Response
) => {
  await permissionService.deletePermission(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Permission deleted successfully",
  });
};

/**
 * Restore Permission
 */
export const restorePermission = async (
  req: Request,
  res: Response
) => {
  const permission = await permissionService.restorePermission(
    req.params.id
  );

  return res.status(200).json({
    success: true,
    message: "Permission restored successfully",
    data: permission,
  });
};
