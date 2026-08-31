import { Request, Response } from "express";
import { provinceService } from "../services/province.service";

export const createProvince = async (
  req: Request,
  res: Response
): Promise<void> => {
  const province = await provinceService.createProvince({
    name: req.body.name,
    status: req.body.status,
    createdBy: req.user?._id
  });

  res.status(201).json({
    success: true,
    message: "Province created successfully",
    data: province
  });
};

export const getProvinces = async (
  req: Request,
  res: Response
): Promise<void> => {
  const provinces = await provinceService.getAllProvinces();

  res.status(200).json({
    success: true,
    message: "Provinces retrieved successfully",
    data: provinces
  });
};

export const getProvince = async (
  req: Request,
  res: Response
): Promise<void> => {
  const province = await provinceService.getProvinceById(
    req.params.id
  );

  res.status(200).json({
    success: true,
    message: "Province retrieved successfully",
    data: province
  });
};

export const updateProvince = async (
  req: Request,
  res: Response
): Promise<void> => {
  const province = await provinceService.updateProvince(
    req.params.id,
    {
      name: req.body.name,
      status: req.body.status,
      updatedBy: req.user?._id
    }
  );

  res.status(200).json({
    success: true,
    message: "Province updated successfully",
    data: province
  });
};

export const deleteProvince = async (
  req: Request,
  res: Response
): Promise<void> => {
  const province = await provinceService.deleteProvince(
    req.params.id,
    req.user?._id
  );

  res.status(200).json({
    success: true,
    message: "Province deleted successfully",
    data: province
  });
};

export const restoreProvince = async (
  req: Request,
  res: Response
): Promise<void> => {
  const province = await provinceService.restoreProvince(
    req.params.id
  );

  res.status(200).json({
    success: true,
    message: "Province restored successfully",
    data: province
  });
};
