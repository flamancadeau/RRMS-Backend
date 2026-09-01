import { z } from "zod";
import { Types } from "mongoose";

const objectIdSchema = z.string().refine(
  (value) => Types.ObjectId.isValid(value),
  {
    message: "Invalid MongoDB ObjectId"
  }
);


export const createProvinceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Province name is required")
    .max(100, "Province name must not exceed 100 characters"),

  status: z
    .enum(["active", "inactive"])
    .default("active")
});


export const updateProvinceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Province name cannot be empty")
    .max(100, "Province name must not exceed 100 characters")
    .optional(),

  status: z
    .enum(["active", "inactive"])
    .optional()
});

/**
 * Province ID validation
 */
export const provinceIdSchema = z.object({
  id: objectIdSchema
});

export type CreateProvinceInput = z.infer<
  typeof createProvinceSchema
>;

export type UpdateProvinceInput = z.infer<
  typeof updateProvinceSchema
>;

export type ProvinceIdInput = z.infer<
  typeof provinceIdSchema
>;