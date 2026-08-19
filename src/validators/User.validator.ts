import { z } from 'zod';

export const createUserSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().min(10),
  password: z.string().min(8),
  nationalId: z.string().min(5),
  role: z.string(),
});