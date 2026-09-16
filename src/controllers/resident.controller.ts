import { Request, Response } from "express";
import * as residentService from "../services/resident.service";

/**
 * Create Resident
 */
export const createResident = async (
  req: Request,
  res: Response
) => {
  const resident = await residentService.createResident(req.body);

  return res.status(201).json({
    success: true,
    message: "Resident created successfully",
    data: resident,
  });
};

/**
 * Get all Residents
 */
export const getResidents = async (
  req: Request,
  res: Response
) => {
  const items = await residentService.getResidents();

  return res.status(200).json({
    success: true,
    data: items,
  });
};

/**
 * Get Resident by ID
 */
export const getResident = async (
  req: Request,
  res: Response
) => {
  const resident = await residentService.getResident(
    req.params.id
  );

  return res.status(200).json({
    success: true,
    data: resident,
  });
};

/**
 * Update Resident
 */
export const updateResident = async (
  req: Request,
  res: Response
) => {
  const resident = await residentService.updateResident(
    req.params.id,
    req.body
  );

  return res.status(200).json({
    success: true,
    message: "Resident updated successfully",
    data: resident,
  });
};

/**
 * Delete Resident
 */
export const deleteResident = async (
  req: Request,
  res: Response
) => {
  await residentService.deleteResident(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Resident deleted successfully",
  });
};

/**
 * Restore Resident
 */
export const restoreResident = async (
  req: Request,
  res: Response
) => {
  const resident = await residentService.restoreResident(
    req.params.id
  );

  return res.status(200).json({
    success: true,
    message: "Resident restored successfully",
    data: resident,
  });
};
