import { Request, Response } from "express";
import * as roleService from "../services/role.service";

/**
 * Create Role
 */
export const createRole = async (
  req: Request,
  res: Response
) => {
  const role = await roleService.createRole(req.body);

  return res.status(201).json({
    success: true,
    message: "Role created successfully",
    data: role,
  });
};

/**
 * Get all Roles
 */
export const getRoles = async (
  req: Request,
  res: Response
) => {
  const items = await roleService.getRoles();

  return res.status(200).json({
    success: true,
    data: items,
  });
};

/**
 * Get Role by ID
 */
export const getRole = async (
  req: Request,
  res: Response
) => {
  const role = await roleService.getRole(
    req.params.id
  );

  return res.status(200).json({
    success: true,
    data: role,
  });
};

/**
 * Update Role
 */
export const updateRole = async (
  req: Request,
  res: Response
) => {
  const role = await roleService.updateRole(
    req.params.id,
    req.body
  );

  return res.status(200).json({
    success: true,
    message: "Role updated successfully",
    data: role,
  });
};

/**
 * Delete Role
 */
export const deleteRole = async (
  req: Request,
  res: Response
) => {
  await roleService.deleteRole(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Role deleted successfully",
  });
};

/**
 * Restore Role
 */
export const restoreRole = async (
  req: Request,
  res: Response
) => {
  const role = await roleService.restoreRole(
    req.params.id
  );

  return res.status(200).json({
    success: true,
    message: "Role restored successfully",
    data: role,
  });
};
