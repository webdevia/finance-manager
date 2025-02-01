import { z } from 'zod';

export const ChangeProfileSchema = z.object({
  name: z.string().nonempty('Required field'),
  description: z.string().optional(),
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
