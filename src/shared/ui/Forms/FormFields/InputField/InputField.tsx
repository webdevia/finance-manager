import React, { ReactNode } from 'react';
import { FieldError, UseFormRegister, Path, FieldValues } from 'react-hook-form';
import { FormField } from '../Field/Field';
import cn from 'clsx';
import s from './InputField.module.scss';

type InputFieldProps<T extends FieldValues> = {
  label: ReactNode;
  type: string;
  required: boolean;
  register: UseFormRegister<T>;
  name: Path<T>;
  isNumber?: boolean;
  errors?: FieldError;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField = <T extends FieldValues>({
  label,
  type,
  required,
  register,
  isNumber,
  name,
  errors,
  onChange,
}: InputFieldProps<T>) => (
  <FormField label={{ children: label, required }} errors={errors}>
    <input
      className={cn(s.input, { [s.error]: errors })}
      type={type}
      onChange={onChange}
      {...register(name, { valueAsNumber: isNumber })}
    />
  </FormField>
);

export default InputField