import { z } from 'zod';

export const ChangeProfileSchema = z.object({
  email: z.string().optional(),
  id: z.string().optional(),
  name: z.string(),
  signUpDate: z.string().optional(),
});

export type ChangeProfileSchemaType = z.infer<typeof ChangeProfileSchema>;

const passwordZodType = z.string().nonempty('Required field').min(6, 'Password is too short');

export const ChangePasswordSchema = z
  .object({
    password: passwordZodType,
    newPassword: passwordZodType,
    confirmPassword: passwordZodType,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>;
