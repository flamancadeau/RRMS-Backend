import { Request, Response } from "express";
import * as sectorService from "../services/sector.service";

/**
 * Create Sector
 */
export const createSector = async (
  req: Request,
  res: Response
) => {
  const sector = await sectorService.createSector(req.body);

  return res.status(201).json({
    success: true,
    message: "Sector created successfully",
    data: sector,
  });
};

/**
 * Get all Sectors
 */
export const getSectors = async (
  req: Request,
  res: Response
) => {
  const items = await sectorService.getSectors();

  return res.status(200).json({
    success: true,
    data: items,
  });
};

/**
 * Get Sector by ID
 */
export const getSector = async (
  req: Request,
  res: Response
) => {
  const sector = await sectorService.getSector(
    req.params.id
  );

  return res.status(200).json({
    success: true,
    data: sector,
  });
};

/**
 * Update Sector
 */
export const updateSector = async (
  req: Request,
  res: Response
) => {
  const sector = await sectorService.updateSector(
    req.params.id,
    req.body
  );

  return res.status(200).json({
    success: true,
    message: "Sector updated successfully",
    data: sector,
  });
};

/**
 * Delete Sector
 */
export const deleteSector = async (
  req: Request,
  res: Response
) => {
  await sectorService.deleteSector(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Sector deleted successfully",
  });
};

/**
 * Restore Sector
 */
export const restoreSector = async (
  req: Request,
  res: Response
) => {
  const sector = await sectorService.restoreSector(
    req.params.id
  );

  return res.status(200).json({
    success: true,
    message: "Sector restored successfully",
    data: sector,
  });
};
