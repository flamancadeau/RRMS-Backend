import { z } from 'zod';
import { Types } from 'mongoose';

const objectIdSchema = z.string().refine(
  (value) => Types.ObjectId.isValid(value),
  {
    message: 'Invalid MongoDB ObjectId',
  }
);

export const createTransferHistorySchema = z.object({
  resident: objectIdSchema,

  fromVillage: objectIdSchema,

  toVillage: objectIdSchema,

  approvedBy: objectIdSchema,

  transferDate: z.coerce
    .date()
    .default(() => new Date()),

  remarks: z
    .string()
    .trim()
    .max(1000, 'Remarks must not exceed 1000 characters')
    .optional(),

  status: z
    .literal('completed')
    .default('completed'),
});

export const updateTransferHistorySchema = z.object({
  remarks: z
    .string()
    .trim()
    .max(1000, 'Remarks must not exceed 1000 characters')
    .optional(),

  updatedBy: objectIdSchema.optional(),
});

export const transferHistoryIdSchema = z.object({
  id: objectIdSchema,
});

export type CreateTransferHistoryInput = z.infer<
  typeof createTransferHistorySchema
>;

export type UpdateTransferHistoryInput = z.infer<
  typeof updateTransferHistorySchema
>;

export type TransferHistoryIdInput = z.infer<
  typeof transferHistoryIdSchema
>;