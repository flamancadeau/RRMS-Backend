import { z } from "zod";
import { Types } from "mongoose";

const objectIdSchema = z.string().refine(
  (value) => Types.ObjectId.isValid(value),
  {
    message: "Invalid MongoDB ObjectId",
  }
);

export const createUserSchema = z.object({
  firstName: z.string().trim().min(2).max(50),
  lastName: z.string().trim().min(2).max(50),
  email: z.string().trim().email().toLowerCase(),
  phone: z.string().trim().min(10).max(30),
  password: z.string().min(8),
  nationalId: z.string().trim().min(5).max(50),
  role: objectIdSchema,
  status: z.enum(["active", "suspended"]).optional(),
});

export const updateUserSchema = z.object({
  firstName: z.string().trim().min(2).max(50).optional(),
  lastName: z.string().trim().min(2).max(50).optional(),
  email: z.string().trim().email().toLowerCase().optional(),
  phone: z.string().trim().min(10).max(30).optional(),
  password: z.string().min(8).optional(),
  nationalId: z.string().trim().min(5).max(50).optional(),
  role: objectIdSchema.optional(),
  status: z.enum(["active", "suspended"]).optional(),
});

export const userIdSchema = z.object({
  id: objectIdSchema,
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UserIdInput = z.infer<typeof userIdSchema>;
