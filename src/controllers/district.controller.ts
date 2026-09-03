import { Request, Response } from "express";
import * as districtService from "../services/district.service";

/**
 * Create District
 */
export const createDistrict = async (
  req: Request,
  res: Response
) => {
  const district = await districtService.createDistrict(req.body);

  return res.status(201).json({
    success: true,
    message: "District created successfully",
    data: district,
  });
};

/**
 * Get all Districts
 */
export const getDistricts = async (
  req: Request,
  res: Response
) => {
  const districts = await districtService.getDistricts();

  return res.status(200).json({
    success: true,
    data: districts,
  });
};

/**
 * Get District by ID
 */
export const getDistrict = async (
  req: Request,
  res: Response
) => {
  const district = await districtService.getDistrict(
    req.params.id
  );

  return res.status(200).json({
    success: true,
    data: district,
  });
};

/**
 * Update District
 */
export const updateDistrict = async (
  req: Request,
  res: Response
) => {
  const district = await districtService.updateDistrict(
    req.params.id,
    req.body
  );

  return res.status(200).json({
    success: true,
    message: "District updated successfully",
    data: district,
  });
};

/**
 * Delete District
 */
export const deleteDistrict = async (
  req: Request,
  res: Response
) => {
  await districtService.deleteDistrict(req.params.id);

  return res.status(200).json({
    success: true,
    message: "District deleted successfully",
  });
};

/**
 * Restore District
 */
export const restoreDistrict = async (
  req: Request,
  res: Response
) => {
  const district = await districtService.restoreDistrict(
    req.params.id
  );

  return res.status(200).json({
    success: true,
    message: "District restored successfully",
    data: district,
  });
};