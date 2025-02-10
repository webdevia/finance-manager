import { z } from 'zod';

const requiredField = z.string().min(1, 'Required field');

export const OperationSchema = z.object({
  name: requiredField,
  desc: z.string().optional(),
  date: requiredField,
  amount: z.number({ invalid_type_error: 'Required field' }).positive('Amount must be greater than 0'),
  category: requiredField,
  type: z.enum(['Cost', 'Profit']),
});

export type OperationSchemaType = z.infer<typeof OperationSchema>;
