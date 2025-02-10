import { z } from 'zod';

const requiredField = z.string().min(1, 'Required field');

export const PasswordSchema = z
  .object({
    password: requiredField,
    newPassword: requiredField,
    newPasswordConfirm: requiredField,
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    message: 'Passwords do not match',
    path: ['newPasswordConfirm'],
  });

export type PasswordSchemaType = z.infer<typeof PasswordSchema>;
