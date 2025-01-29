import { z } from 'zod';

export const OperationSchema = z.object({
  name: z.string().nonempty('Обязательное поле'),
  desc: z.string().optional(),
  createdAt: z.string().nonempty('Обязательное поле'),
  amount: z.number({ invalid_type_error: 'Обязательное поле' }).positive('Сумма должна быть больше 0'),
  category: z.string().nonempty('Обязательное поле'),
  type: z.enum(['Cost', 'Profit']),
});

export type OperationSchemaType = z.infer<typeof OperationSchema>;
