import { z } from 'zod';

export const CategorySchema = z.object({
  name: z.string().min(1, 'Required field'),
  photo: z.string().optional(),
});

export type CategorySchemaType = z.infer<typeof CategorySchema>;
