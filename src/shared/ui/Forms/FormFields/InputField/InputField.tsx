import React, { ReactNode } from 'react';
import { FieldError, UseFormRegister, Path, FieldValues } from 'react-hook-form';
import Field from '../Field/Field';
import cn from 'clsx';
import s from './InputField.module.scss';

type InputFieldProps<T extends FieldValues> = {
  label: ReactNode;
  inputId: string;
  type: string;
  required: boolean;
  register: UseFormRegister<T>;
  name: Path<T>;
  isNumber?: boolean;
  errors?: FieldError;
  readOnly?: boolean;
  disabled?: boolean;
};

const InputField = <T extends FieldValues>({
  label,
  inputId,
  type,
  required,
  readOnly,
  register,
  isNumber,
  name,
  errors,
  disabled,
}: InputFieldProps<T>) => (
  <Field label={{ children: label, required, inputId }} errors={errors}>
    <input
      id={inputId}
      className={cn(s.input, { [s.error]: errors })}
      type={type}
      {...register(name, { valueAsNumber: isNumber })}
      readOnly={readOnly}
      disabled={disabled}
    />
  </Field>
);

export default InputField;
