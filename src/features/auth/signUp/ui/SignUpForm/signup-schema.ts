import { z } from 'zod';

export const SignUpSchema = z.object({
  email: z.string().min(1, 'Required field').email('Invalid Email'),
  password: z.string().min(1, 'Required field').min(6, 'Password is too short'),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
