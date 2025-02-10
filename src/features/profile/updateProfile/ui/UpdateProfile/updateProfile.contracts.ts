import { z } from 'zod';

export const ProfileSchema = z.object({
  email: z.string().optional(),
  id: z.string().optional(),
  name: z.string().nonempty(),
  signUpDate: z.string().optional(),
});

export type ProfileSchemaType = z.infer<typeof ProfileSchema>;
