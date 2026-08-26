import { z } from 'zod';
import { Types } from 'mongoose';

const objectIdSchema = z.string().refine(
  (value) => Types.ObjectId.isValid(value),
  {
    message: 'Invalid MongoDB ObjectId',
  }
);

export const createSectorSchema = z.object({
  district: objectIdSchema,

  name: z
    .string()
    .trim()
    .min(1, 'Sector name is required')
    .max(100, 'Sector name must not exceed 100 characters'),

  code: z
    .string()
    .trim()
    .min(1, 'Sector code is required')
    .max(50, 'Sector code must not exceed 50 characters')
    .transform((value) => value.toUpperCase()),

  status: z
    .enum(['active', 'inactive'])
    .default('active'),

  createdBy: objectIdSchema.optional(),

  updatedBy: objectIdSchema.optional(),
});

export const updateSectorSchema = z.object({
  district: objectIdSchema.optional(),

  name: z
    .string()
    .trim()
    .min(1, 'Sector name cannot be empty')
    .max(100, 'Sector name must not exceed 100 characters')
    .optional(),

  code: z
    .string()
    .trim()
    .min(1, 'Sector code cannot be empty')
    .max(50, 'Sector code must not exceed 50 characters')
    .transform((value) => value.toUpperCase())
    .optional(),

  status: z
    .enum(['active', 'inactive'])
    .optional(),

  updatedBy: objectIdSchema.optional(),
});

export const sectorIdSchema = z.object({
  id: objectIdSchema,
});

export type CreateSectorInput = z.infer<typeof createSectorSchema>;
export type UpdateSectorInput = z.infer<typeof updateSectorSchema>;
export type SectorIdInput = z.infer<typeof sectorIdSchema>;