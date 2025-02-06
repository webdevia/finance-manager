import { z } from 'zod';

export const ProfileSchema = z.object({
  email: z.string().optional(),
  id: z.string().optional(),
  name: z.string(),
  signUpDate: z.string().optional(),
});
