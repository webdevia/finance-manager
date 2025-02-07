import { z } from 'zod';

export const PasswordSchema = z.object({
  password: z.string().nonempty(),
  newPassword: z.string().nonempty(),
  newPasswordConfirm: z.string().nonempty(),
});

export type PasswordSchemaType = z.infer<typeof PasswordSchema>;
