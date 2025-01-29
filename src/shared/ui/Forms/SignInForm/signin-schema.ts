import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().nonempty('Required field').email('Invalid Email'),
  password: z.string().nonempty('Required field').min(6, 'Too short password'),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;
