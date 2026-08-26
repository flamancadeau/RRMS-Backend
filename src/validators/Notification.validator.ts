import { z } from 'zod';
import { Types } from 'mongoose';

const objectIdSchema = z.string().refine(
  (value) => Types.ObjectId.isValid(value),
  {
    message: 'Invalid MongoDB ObjectId',
  }
);

export const createNotificationSchema = z.object({
  sender: objectIdSchema.optional(),

  receiver: objectIdSchema,

  title: z
    .string()
    .trim()
    .min(1, 'Notification title is required')
    .max(150, 'Notification title must not exceed 150 characters'),

  message: z
    .string()
    .trim()
    .min(1, 'Notification message is required')
    .max(2000, 'Notification message must not exceed 2000 characters'),

  type: z
    .enum(['info', 'alert', 'transfer', 'system'])
    .default('info'),

  isRead: z
    .boolean()
    .default(false),

  status: z
    .enum(['active', 'inactive'])
    .default('active'),

  createdBy: objectIdSchema.optional(),

  updatedBy: objectIdSchema.optional(),
});

export const updateNotificationSchema = z.object({
  sender: objectIdSchema.optional(),

  receiver: objectIdSchema.optional(),

  title: z
    .string()
    .trim()
    .min(1, 'Notification title cannot be empty')
    .max(150, 'Notification title must not exceed 150 characters')
    .optional(),

  message: z
    .string()
    .trim()
    .min(1, 'Notification message cannot be empty')
    .max(2000, 'Notification message must not exceed 2000 characters')
    .optional(),

  type: z
    .enum(['info', 'alert', 'transfer', 'system'])
    .optional(),

  isRead: z
    .boolean()
    .optional(),

  status: z
    .enum(['active', 'inactive'])
    .optional(),

  updatedBy: objectIdSchema.optional(),
});

export const notificationIdSchema = z.object({
  id: objectIdSchema,
});

export type CreateNotificationInput = z.infer<typeof createNotificationSchema>;
export type UpdateNotificationInput = z.infer<typeof updateNotificationSchema>;
export type NotificationIdInput = z.infer<typeof notificationIdSchema>;