import { z } from 'zod';

const requiredField = z.string().nonempty('Required field');

export const CategorySchema = z.object({
  name: requiredField,
  photo: z.string().optional(),
});

export type CategorySchemaType = z.infer<typeof CategorySchema>;
