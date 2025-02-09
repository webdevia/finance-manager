import { z } from 'zod';

export const PasswordSchema = z.object({
  password: z.string().nonempty(),
  newPassword: z.string().nonempty(),
  newPasswordConfirm: z.string().nonempty(),
}).refine((data) => data.newPassword === data.newPasswordConfirm, {
  message: 'Passwords do not match',
  path: ['newPasswordConfirm'],
});

export type PasswordSchemaType = z.infer<typeof PasswordSchema>;
