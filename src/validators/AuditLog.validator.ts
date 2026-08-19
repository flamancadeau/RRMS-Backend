import { z } from 'zod';
import { Types } from 'mongoose';

const objectIdSchema = z.string().refine(
  (value) => Types.ObjectId.isValid(value),
  {
    message: 'Invalid MongoDB ObjectId',
  }
);

export const createAuditLogSchema = z.object({
  user: objectIdSchema,

  action: z
    .string()
    .trim()
    .min(1, 'Action is required')
    .max(100, 'Action must not exceed 100 characters'),

  module: z
    .string()
    .trim()
    .min(1, 'Module is required')
    .max(100, 'Module must not exceed 100 characters'),

  recordId: z
    .string()
    .trim()
    .optional(),

  description: z
    .string()
    .trim()
    .min(1, 'Description is required')
    .max(1000, 'Description must not exceed 1000 characters'),

  ip: z
    .string()
    .trim()
    .optional(),

  userAgent: z
    .string()
    .trim()
    .optional(),

  status: z
    .literal('active')
    .default('active'),

  createdBy: objectIdSchema.optional(),

  updatedBy: objectIdSchema.optional(),
});

export const updateAuditLogSchema = z.object({
  user: objectIdSchema.optional(),

  action: z
    .string()
    .trim()
    .min(1, 'Action cannot be empty')
    .max(100)
    .optional(),

  module: z
    .string()
    .trim()
    .min(1, 'Module cannot be empty')
    .max(100)
    .optional(),

  recordId: z
    .string()
    .trim()
    .optional(),

  description: z
    .string()
    .trim()
    .min(1, 'Description cannot be empty')
    .max(1000)
    .optional(),

  ip: z
    .string()
    .trim()
    .optional(),

  userAgent: z
    .string()
    .trim()
    .optional(),

  status: z
    .literal('active')
    .optional(),

  updatedBy: objectIdSchema.optional(),
});

export const auditLogIdSchema = z.object({
  id: objectIdSchema,
});

export type CreateAuditLogInput = z.infer<typeof createAuditLogSchema>;
export type UpdateAuditLogInput = z.infer<typeof updateAuditLogSchema>;
export type AuditLogIdInput = z.infer<typeof auditLogIdSchema>;