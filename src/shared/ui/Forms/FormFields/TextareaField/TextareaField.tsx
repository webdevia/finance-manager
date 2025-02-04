import React, { ReactNode } from 'react';
import { FieldError, UseFormRegister, Path, FieldValues } from 'react-hook-form';
import cn from 'clsx';
import s from './TextareaField.module.scss';
import Field from '../Field/Field';

type TextareaFieldProps<T extends FieldValues> = {
  label: ReactNode;
  inputId: string;
  required: boolean;
  register: UseFormRegister<T>;
  name: Path<T>;
  rows?: number;
  errors?: FieldError;
};

export const TextareaField = <T extends FieldValues>({
  label,
  inputId,
  required,
  rows,
  register,
  name,
  errors,
}: TextareaFieldProps<T>) => (
  <Field label={{ children: label, required, inputId }} errors={errors}>
    <textarea className={cn(s.textarea, { [s.error]: errors })} {...register(name)} rows={rows ?? 4}></textarea>
  </Field>
);

export default TextareaField;
