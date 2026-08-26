import { z } from 'zod';
import { Types } from 'mongoose';

const objectIdSchema = z.string().refine(
  (value) => Types.ObjectId.isValid(value),
  {
    message: 'Invalid MongoDB ObjectId',
  }
);

export const createDistrictSchema = z.object({
  province: objectIdSchema,

  name: z
    .string()
    .trim()
    .min(1, 'District name is required')
    .max(100, 'District name must not exceed 100 characters'),

  code: z
    .string()
    .trim()
    .min(1, 'District code is required')
    .max(50, 'District code must not exceed 50 characters')
    .transform((value) => value.toUpperCase()),

  status: z
    .enum(['active', 'inactive'])
    .default('active'),

  createdBy: objectIdSchema.optional(),

  updatedBy: objectIdSchema.optional(),
});

export const updateDistrictSchema = z.object({
  province: objectIdSchema.optional(),

  name: z
    .string()
    .trim()
    .min(1, 'District name cannot be empty')
    .max(100, 'District name must not exceed 100 characters')
    .optional(),

  code: z
    .string()
    .trim()
    .min(1, 'District code cannot be empty')
    .max(50, 'District code must not exceed 50 characters')
    .transform((value) => value.toUpperCase())
    .optional(),

  status: z
    .enum(['active', 'inactive'])
    .optional(),

  updatedBy: objectIdSchema.optional(),
});

export const districtIdSchema = z.object({
  id: objectIdSchema,
});

export type CreateDistrictInput = z.infer<typeof createDistrictSchema>;
export type UpdateDistrictInput = z.infer<typeof updateDistrictSchema>;
export type DistrictIdInput = z.infer<typeof districtIdSchema>;