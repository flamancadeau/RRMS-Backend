import { z } from 'zod';
import { Types } from 'mongoose';

const objectIdSchema = z.string().refine(
  (value) => Types.ObjectId.isValid(value),
  {
    message: 'Invalid MongoDB ObjectId',
  }
);

export const createCellSchema = z.object({
  sector: objectIdSchema,

  name: z
    .string()
    .trim()
    .min(1, 'Cell name is required')
    .max(100, 'Cell name must not exceed 100 characters'),

  code: z
    .string()
    .trim()
    .min(1, 'Cell code is required')
    .max(50, 'Cell code must not exceed 50 characters')
    .transform((value) => value.toUpperCase()),

  status: z
    .enum(['active', 'inactive'])
    .default('active'),

  createdBy: objectIdSchema.optional(),

  updatedBy: objectIdSchema.optional(),
});

export const updateCellSchema = z.object({
  sector: objectIdSchema.optional(),

  name: z
    .string()
    .trim()
    .min(1, 'Cell name cannot be empty')
    .max(100, 'Cell name must not exceed 100 characters')
    .optional(),

  code: z
    .string()
    .trim()
    .min(1, 'Cell code cannot be empty')
    .max(50, 'Cell code must not exceed 50 characters')
    .transform((value) => value.toUpperCase())
    .optional(),

  status: z
    .enum(['active', 'inactive'])
    .optional(),

  updatedBy: objectIdSchema.optional(),
});

export const cellIdSchema = z.object({
  id: objectIdSchema,
});

export type CreateCellInput = z.infer<typeof createCellSchema>;
export type UpdateCellInput = z.infer<typeof updateCellSchema>;
export type CellIdInput = z.infer<typeof cellIdSchema>;