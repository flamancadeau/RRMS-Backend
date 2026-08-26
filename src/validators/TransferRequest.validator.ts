import { z } from "zod";
import { Types } from "mongoose";

const objectIdSchema = z
  .string()
  .refine((value) => Types.ObjectId.isValid(value), {
    message: "Invalid MongoDB ObjectId",
  });

const approvalSchema = z.object({
  approved: z.boolean().default(false),

  by: objectIdSchema.optional(),

  date: z.coerce.date().optional(),
});

export const createTransferRequestSchema = z
  .object({
    resident: objectIdSchema,

    oldVillage: objectIdSchema,

    newVillage: objectIdSchema,

    reason: z
      .string()
      .trim()
      .min(10, "Transfer reason must be at least 10 characters")
      .max(1000, "Transfer reason must not exceed 1000 characters"),

    requestedDate: z.coerce.date().default(() => new Date()),

    approvedByOldLeader: approvalSchema.default({ approved: false }),

    approvedByNewLeader: approvalSchema.default({ approved: false }),

    status: z.enum(["pending", "approved", "rejected"]).default("pending"),
  })
  .refine((data) => data.oldVillage !== data.newVillage, {
    message: "Old and new villages must be different",
    path: ["newVillage"],
  });

export const updateTransferRequestSchema = z.object({
  reason: z
    .string()
    .trim()
    .min(10, "Transfer reason must be at least 10 characters")
    .max(1000, "Transfer reason must not exceed 1000 characters")
    .optional(),

  requestedDate: z.coerce.date().optional(),

  approvedByOldLeader: approvalSchema.optional(),

  approvedByNewLeader: approvalSchema.optional(),

  status: z.enum(["pending", "approved", "rejected"]).optional(),

  updatedBy: objectIdSchema.optional(),
});

export const transferRequestIdSchema = z.object({
  id: objectIdSchema,
});

export type CreateTransferRequestInput = z.infer<
  typeof createTransferRequestSchema
>;

export type UpdateTransferRequestInput = z.infer<
  typeof updateTransferRequestSchema
>;

export type TransferRequestIdInput = z.infer<typeof transferRequestIdSchema>;
