import { Request, Response } from "express";
import * as cellService from "../services/cell.service";

/**
 * Create Cell
 */
export const createCell = async (
  req: Request,
  res: Response
) => {
  const cell = await cellService.createCell(req.body);

  return res.status(201).json({
    success: true,
    message: "Cell created successfully",
    data: cell,
  });
};

/**
 * Get all Cells
 */
export const getCells = async (
  req: Request,
  res: Response
) => {
  const items = await cellService.getCells();

  return res.status(200).json({
    success: true,
    data: items,
  });
};

/**
 * Get Cell by ID
 */
export const getCell = async (
  req: Request,
  res: Response
) => {
  const cell = await cellService.getCell(
    req.params.id
  );

  return res.status(200).json({
    success: true,
    data: cell,
  });
};

/**
 * Update Cell
 */
export const updateCell = async (
  req: Request,
  res: Response
) => {
  const cell = await cellService.updateCell(
    req.params.id,
    req.body
  );

  return res.status(200).json({
    success: true,
    message: "Cell updated successfully",
    data: cell,
  });
};

/**
 * Delete Cell
 */
export const deleteCell = async (
  req: Request,
  res: Response
) => {
  await cellService.deleteCell(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Cell deleted successfully",
  });
};

/**
 * Restore Cell
 */
export const restoreCell = async (
  req: Request,
  res: Response
) => {
  const cell = await cellService.restoreCell(
    req.params.id
  );

  return res.status(200).json({
    success: true,
    message: "Cell restored successfully",
    data: cell,
  });
};
