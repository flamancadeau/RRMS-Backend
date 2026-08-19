import { z } from 'zod';
import { Types } from 'mongoose';

const objectIdSchema = z.string().refine(
  (value) => Types.ObjectId.isValid(value),
  {
    message: 'Invalid MongoDB ObjectId',
  }
);

export const createResidentSchema = z.object({
  household: objectIdSchema,

  village: objectIdSchema,

  firstName: z
    .string()
    .trim()
    .min(2, 'First name must be at least 2 characters')
    .max(100, 'First name must not exceed 100 characters'),

  lastName: z
    .string()
    .trim()
    .min(2, 'Last name must be at least 2 characters')
    .max(100, 'Last name must not exceed 100 characters'),

  gender: z.enum(['male', 'female', 'other']),

  dateOfBirth: z.coerce
    .date()
    .refine(
      (date) => date <= new Date(),
      'Date of birth cannot be in the future'
    ),

  nationalId: z
    .string()
    .trim()
    .min(1, 'National ID is required')
    .max(50, 'National ID must not exceed 50 characters'),

  residentCode: z
    .string()
    .trim()
    .min(1, 'Resident code is required')
    .max(50, 'Resident code must not exceed 50 characters')
    .transform((value) => value.toUpperCase()),

  maritalStatus: z.enum([
    'single',
    'married',
    'divorced',
    'widowed',
  ]),

  phone: z
    .string()
    .trim()
    .max(30, 'Phone number must not exceed 30 characters')
    .optional(),

  email: z
    .string()
    .trim()
    .email('Invalid email address')
    .toLowerCase()
    .optional(),

  occupation: z
    .string()
    .trim()
    .max(150, 'Occupation must not exceed 150 characters')
    .optional(),

  photo: z
    .string()
    .trim()
    .optional(),

  status: z
    .enum(['active', 'inactive', 'moved'])
    .default('active'),

  createdBy: objectIdSchema.optional(),

  updatedBy: objectIdSchema.optional(),
});

export const updateResidentSchema = z.object({
  household: objectIdSchema.optional(),

  village: objectIdSchema.optional(),

  firstName: z
    .string()
    .trim()
    .min(2, 'First name must be at least 2 characters')
    .max(100, 'First name must not exceed 100 characters')
    .optional(),

  lastName: z
    .string()
    .trim()
    .min(2, 'Last name must be at least 2 characters')
    .max(100, 'Last name must not exceed 100 characters')
    .optional(),

  gender: z
    .enum(['male', 'female', 'other'])
    .optional(),

  dateOfBirth: z.coerce
    .date()
    .refine(
      (date) => date <= new Date(),
      'Date of birth cannot be in the future'
    )
    .optional(),

  nationalId: z
    .string()
    .trim()
    .min(1, 'National ID cannot be empty')
    .max(50, 'National ID must not exceed 50 characters')
    .optional(),

  residentCode: z
    .string()
    .trim()
    .min(1, 'Resident code cannot be empty')
    .max(50, 'Resident code must not exceed 50 characters')
    .transform((value) => value.toUpperCase())
    .optional(),

  maritalStatus: z
    .enum([
      'single',
      'married',
      'divorced',
      'widowed',
    ])
    .optional(),

  phone: z
    .string()
    .trim()
    .max(30, 'Phone number must not exceed 30 characters')
    .optional(),

  email: z
    .string()
    .trim()
    .email('Invalid email address')
    .toLowerCase()
    .optional(),

  occupation: z
    .string()
    .trim()
    .max(150, 'Occupation must not exceed 150 characters')
    .optional(),

  photo: z
    .string()
    .trim()
    .optional(),

  status: z
    .enum(['active', 'inactive', 'moved'])
    .optional(),

  updatedBy: objectIdSchema.optional(),
});

export const residentIdSchema = z.object({
  id: objectIdSchema,
});

export type CreateResidentInput = z.infer<typeof createResidentSchema>;
export type UpdateResidentInput = z.infer<typeof updateResidentSchema>;
export type ResidentIdInput = z.infer<typeof residentIdSchema>;