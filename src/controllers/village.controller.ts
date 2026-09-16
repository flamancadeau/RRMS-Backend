import { Request, Response } from "express";
import * as villageService from "../services/village.service";

/**
 * Create Village
 */
export const createVillage = async (
  req: Request,
  res: Response
) => {
  const village = await villageService.createVillage(req.body);

  return res.status(201).json({
    success: true,
    message: "Village created successfully",
    data: village,
  });
};

/**
 * Get all Villages
 */
export const getVillages = async (
  req: Request,
  res: Response
) => {
  const items = await villageService.getVillages();

  return res.status(200).json({
    success: true,
    data: items,
  });
};

/**
 * Get Village by ID
 */
export const getVillage = async (
  req: Request,
  res: Response
) => {
  const village = await villageService.getVillage(
    req.params.id
  );

  return res.status(200).json({
    success: true,
    data: village,
  });
};

/**
 * Update Village
 */
export const updateVillage = async (
  req: Request,
  res: Response
) => {
  const village = await villageService.updateVillage(
    req.params.id,
    req.body
  );

  return res.status(200).json({
    success: true,
    message: "Village updated successfully",
    data: village,
  });
};

/**
 * Delete Village
 */
export const deleteVillage = async (
  req: Request,
  res: Response
) => {
  await villageService.deleteVillage(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Village deleted successfully",
  });
};

/**
 * Restore Village
 */
export const restoreVillage = async (
  req: Request,
  res: Response
) => {
  const village = await villageService.restoreVillage(
    req.params.id
  );

  return res.status(200).json({
    success: true,
    message: "Village restored successfully",
    data: village,
  });
};
