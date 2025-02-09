import { ZodObject, ZodOptional, ZodRawShape } from 'zod';

export const useIsFieldRequired =
  <T extends ZodRawShape>(schema: ZodObject<T>) =>
  (fieldName: keyof T): boolean => {
    return !(schema.shape[fieldName] instanceof ZodOptional);
  };
