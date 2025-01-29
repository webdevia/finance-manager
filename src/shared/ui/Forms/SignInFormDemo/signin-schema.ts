import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().nonempty('Обязательное поле').email('Неправильный Email'),
  // password: z.string().optional()
  password: z.string().nonempty('Обязательное поле').min(6, 'Слишком короткий пароль'),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;
