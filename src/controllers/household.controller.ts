import { Request, Response } from "express";
import * as householdService from "../services/household.service";

/**
 * Create Household
 */
export const createHousehold = async (
  req: Request,
  res: Response
) => {
  const household = await householdService.createHousehold(req.body);

  return res.status(201).json({
    success: true,
    message: "Household created successfully",
    data: household,
  });
};

/**
 * Get all Households
 */
export const getHouseholds = async (
  req: Request,
  res: Response
) => {
  const items = await householdService.getHouseholds();

  return res.status(200).json({
    success: true,
    data: items,
  });
};

/**
 * Get Household by ID
 */
export const getHousehold = async (
  req: Request,
  res: Response
) => {
  const household = await householdService.getHousehold(
    req.params.id
  );

  return res.status(200).json({
    success: true,
    data: household,
  });
};

/**
 * Update Household
 */
export const updateHousehold = async (
  req: Request,
  res: Response
) => {
  const household = await householdService.updateHousehold(
    req.params.id,
    req.body
  );

  return res.status(200).json({
    success: true,
    message: "Household updated successfully",
    data: household,
  });
};

/**
 * Delete Household
 */
export const deleteHousehold = async (
  req: Request,
  res: Response
) => {
  await householdService.deleteHousehold(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Household deleted successfully",
  });
};

/**
 * Restore Household
 */
export const restoreHousehold = async (
  req: Request,
  res: Response
) => {
  const household = await householdService.restoreHousehold(
    req.params.id
  );

  return res.status(200).json({
    success: true,
    message: "Household restored successfully",
    data: household,
  });
};
