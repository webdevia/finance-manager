import React, { ReactNode } from 'react';
import { FieldError, UseFormRegister, Path, FieldValues } from 'react-hook-form';
import cn from 'clsx';
import s from './SelectField.module.scss';
import Field from '../Field/Field';

export type SelectOptionProps = {
  text: string;
  value: string;
};

const SelectOption = ({ text, value }: SelectOptionProps) => <option value={value}>{text}</option>;

type SelectFieldProps<T extends FieldValues> = {
  label: ReactNode;
  register: UseFormRegister<T>;
  options: SelectOptionProps[];
  name: Path<T>;
  required: boolean;
  errors?: FieldError;
};

const SelectField = <T extends FieldValues>({
  label,
  register,
  options,
  name,
  required,
  errors,
}: SelectFieldProps<T>) => (
  <Field label={{ children: label, required }} errors={errors}>
    <select className={cn(s.select, { [s.error]: errors })} {...register(name)}>
      {options.map((option, index) => (
        <SelectOption key={index} {...option} />
      ))}
    </select>
</Field>
);

export default SelectField;
