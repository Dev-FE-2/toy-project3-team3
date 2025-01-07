import { z } from 'zod';
import { baseUserSchema } from './baseUserSchema';

export const signInSchema = z.object({
  email: baseUserSchema.shape.email,
  password: baseUserSchema.shape.password,
});

export type SignInFormValues = z.infer<typeof signInSchema>;
