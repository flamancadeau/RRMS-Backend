import { z } from 'zod';
import { Types } from 'mongoose';

const objectIdSchema = z.string().refine(
  (value) => Types.ObjectId.isValid(value),
  {
    message: 'Invalid MongoDB ObjectId',
  }
);

export const createVillageSchema = z.object({
  cell: objectIdSchema,

  name: z
    .string()
    .trim()
    .min(1, 'Village name is required')
    .max(100, 'Village name must not exceed 100 characters'),

  code: z
    .string()
    .trim()
    .min(1, 'Village code is required')
    .max(50, 'Village code must not exceed 50 characters')
    .transform((value) => value.toUpperCase()),

  leader: objectIdSchema.optional(),

  population: z
    .number()
    .int('Population must be an integer')
    .min(0, 'Population cannot be negative')
    .default(0),

  status: z
    .enum(['active', 'inactive'])
    .default('active'),

  createdBy: objectIdSchema.optional(),

  updatedBy: objectIdSchema.optional(),
});

export const updateVillageSchema = z.object({
  cell: objectIdSchema.optional(),

  name: z
    .string()
    .trim()
    .min(1, 'Village name cannot be empty')
    .max(100, 'Village name must not exceed 100 characters')
    .optional(),

  code: z
    .string()
    .trim()
    .min(1, 'Village code cannot be empty')
    .max(50, 'Village code must not exceed 50 characters')
    .transform((value) => value.toUpperCase())
    .optional(),

  leader: objectIdSchema.optional(),

  population: z
    .number()
    .int('Population must be an integer')
    .min(0, 'Population cannot be negative')
    .optional(),

  status: z
    .enum(['active', 'inactive'])
    .optional(),

  updatedBy: objectIdSchema.optional(),
});

export const villageIdSchema = z.object({
  id: objectIdSchema,
});

export type CreateVillageInput = z.infer<typeof createVillageSchema>;
export type UpdateVillageInput = z.infer<typeof updateVillageSchema>;
export type VillageIdInput = z.infer<typeof villageIdSchema>;