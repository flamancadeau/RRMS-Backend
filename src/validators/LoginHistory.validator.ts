import { z } from 'zod';
import { Types } from 'mongoose';

const objectIdSchema = z.string().refine(
  (value) => Types.ObjectId.isValid(value),
  {
    message: 'Invalid MongoDB ObjectId',
  }
);

export const createLoginHistorySchema = z.object({
  user: objectIdSchema,

  device: z
    .string()
    .trim()
    .max(100, 'Device must not exceed 100 characters')
    .optional(),

  browser: z
    .string()
    .trim()
    .max(100, 'Browser must not exceed 100 characters')
    .optional(),

  os: z
    .string()
    .trim()
    .max(100, 'Operating system must not exceed 100 characters')
    .optional(),

  location: z
    .string()
    .trim()
    .max(255, 'Location must not exceed 255 characters')
    .optional(),

  ipAddress: z
    .string()
    .trim()
    .max(45, 'IP address must not exceed 45 characters')
    .optional(),

  loginTime: z
    .coerce
    .date()
    .default(() => new Date()),

  logoutTime: z
    .coerce
    .date()
    .optional(),

  status: z
    .enum(['success', 'failed']),

  createdBy: objectIdSchema.optional(),

  updatedBy: objectIdSchema.optional(),
});

export const updateLoginHistorySchema = z.object({
  device: z
    .string()
    .trim()
    .max(100, 'Device must not exceed 100 characters')
    .optional(),

  browser: z
    .string()
    .trim()
    .max(100, 'Browser must not exceed 100 characters')
    .optional(),

  os: z
    .string()
    .trim()
    .max(100, 'Operating system must not exceed 100 characters')
    .optional(),

  location: z
    .string()
    .trim()
    .max(255, 'Location must not exceed 255 characters')
    .optional(),

  ipAddress: z
    .string()
    .trim()
    .max(45, 'IP address must not exceed 45 characters')
    .optional(),

  loginTime: z
    .coerce
    .date()
    .optional(),

  logoutTime: z
    .coerce
    .date()
    .optional(),

  status: z
    .enum(['success', 'failed'])
    .optional(),

  updatedBy: objectIdSchema.optional(),
});

export const loginHistoryIdSchema = z.object({
  id: objectIdSchema,
});

export type CreateLoginHistoryInput = z.infer<typeof createLoginHistorySchema>;
export type UpdateLoginHistoryInput = z.infer<typeof updateLoginHistorySchema>;
export type LoginHistoryIdInput = z.infer<typeof loginHistoryIdSchema>;