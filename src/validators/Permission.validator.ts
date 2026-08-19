import { z } from 'zod';
import { Types } from 'mongoose';

const objectIdSchema = z.string().refine(
  (value) => Types.ObjectId.isValid(value),
  {
    message: 'Invalid MongoDB ObjectId',
  }
);

export const createPermissionSchema = z.object({
  module: z
    .string()
    .trim()
    .min(1, 'Module is required')
    .max(100, 'Module must not exceed 100 characters'),

  action: z.enum([
    'create',
    'read',
    'update',
    'delete',
    'approve',
    'export',
  ]),

  code: z
    .string()
    .trim()
    .min(1, 'Permission code is required')
    .max(100, 'Permission code must not exceed 100 characters')
    .transform((value) => value.toUpperCase()),

  description: z
    .string()
    .trim()
    .min(1, 'Permission description is required')
    .max(500, 'Permission description must not exceed 500 characters'),

  status: z
    .enum(['active', 'inactive'])
    .default('active'),

  createdBy: objectIdSchema.optional(),

  updatedBy: objectIdSchema.optional(),
});

export const updatePermissionSchema = z.object({
  module: z
    .string()
    .trim()
    .min(1, 'Module cannot be empty')
    .max(100, 'Module must not exceed 100 characters')
    .optional(),

  action: z
    .enum([
      'create',
      'read',
      'update',
      'delete',
      'approve',
      'export',
    ])
    .optional(),

  code: z
    .string()
    .trim()
    .min(1, 'Permission code cannot be empty')
    .max(100, 'Permission code must not exceed 100 characters')
    .transform((value) => value.toUpperCase())
    .optional(),

  description: z
    .string()
    .trim()
    .min(1, 'Permission description cannot be empty')
    .max(500, 'Permission description must not exceed 500 characters')
    .optional(),

  status: z
    .enum(['active', 'inactive'])
    .optional(),

  updatedBy: objectIdSchema.optional(),
});

export const permissionIdSchema = z.object({
  id: objectIdSchema,
});

export type CreatePermissionInput = z.infer<typeof createPermissionSchema>;
export type UpdatePermissionInput = z.infer<typeof updatePermissionSchema>;
export type PermissionIdInput = z.infer<typeof permissionIdSchema>;