import { z } from 'zod';
import { Types } from 'mongoose';

const objectIdSchema = z.string().refine(
  (value) => Types.ObjectId.isValid(value),
  {
    message: 'Invalid MongoDB ObjectId',
  }
);

const roleNameSchema = z.enum([
  'SuperAdmin',
  'ProvinceAdmin',
  'DistrictAdmin',
  'SectorAdmin',
  'CellAdmin',
  'VillageLeader',
  'VillageSecretary',
  'Viewer',
]);

export const createRoleSchema = z.object({
  name: roleNameSchema,

  description: z
    .string()
    .trim()
    .min(1, 'Role description is required')
    .max(500, 'Role description must not exceed 500 characters'),

  permissions: z
    .array(objectIdSchema)
    .default([]),

  level: z
    .number()
    .int('Role level must be an integer')
    .min(0, 'Role level cannot be negative'),

  status: z
    .enum(['active', 'inactive'])
    .default('active'),

  createdBy: objectIdSchema.optional(),

  updatedBy: objectIdSchema.optional(),
});

export const updateRoleSchema = z.object({
  name: roleNameSchema.optional(),

  description: z
    .string()
    .trim()
    .min(1, 'Role description cannot be empty')
    .max(500, 'Role description must not exceed 500 characters')
    .optional(),

  permissions: z
    .array(objectIdSchema)
    .optional(),

  level: z
    .number()
    .int('Role level must be an integer')
    .min(0, 'Role level cannot be negative')
    .optional(),

  status: z
    .enum(['active', 'inactive'])
    .optional(),

  updatedBy: objectIdSchema.optional(),
});

export const roleIdSchema = z.object({
  id: objectIdSchema,
});

export type CreateRoleInput = z.infer<typeof createRoleSchema>;
export type UpdateRoleInput = z.infer<typeof updateRoleSchema>;
export type RoleIdInput = z.infer<typeof roleIdSchema>;