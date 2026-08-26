import { z } from 'zod';
import { Types } from 'mongoose';

const objectIdSchema = z.string().refine(
  (value) => Types.ObjectId.isValid(value),
  {
    message: 'Invalid MongoDB ObjectId',
  }
);

export const createHouseholdSchema = z.object({
  village: objectIdSchema,

  householdCode: z
    .string()
    .trim()
    .min(1, 'Household code is required')
    .max(50, 'Household code must not exceed 50 characters')
    .transform((value) => value.toUpperCase()),

  head: objectIdSchema,

  members: z
    .array(objectIdSchema)
    .default([]),

  address: z
    .string()
    .trim()
    .min(1, 'Address is required')
    .max(255, 'Address must not exceed 255 characters'),

  status: z
    .enum(['active', 'inactive'])
    .default('active'),

  createdBy: objectIdSchema.optional(),

  updatedBy: objectIdSchema.optional(),
});

export const updateHouseholdSchema = z.object({
  village: objectIdSchema.optional(),

  householdCode: z
    .string()
    .trim()
    .min(1, 'Household code cannot be empty')
    .max(50, 'Household code must not exceed 50 characters')
    .transform((value) => value.toUpperCase())
    .optional(),

  head: objectIdSchema.optional(),

  members: z
    .array(objectIdSchema)
    .optional(),

  address: z
    .string()
    .trim()
    .min(1, 'Address cannot be empty')
    .max(255, 'Address must not exceed 255 characters')
    .optional(),

  status: z
    .enum(['active', 'inactive'])
    .optional(),

  updatedBy: objectIdSchema.optional(),
});

export const householdIdSchema = z.object({
  id: objectIdSchema,
});

export type CreateHouseholdInput = z.infer<typeof createHouseholdSchema>;
export type UpdateHouseholdInput = z.infer<typeof updateHouseholdSchema>;
export type HouseholdIdInput = z.infer<typeof householdIdSchema>;