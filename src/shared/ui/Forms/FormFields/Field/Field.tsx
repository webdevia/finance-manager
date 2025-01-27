import React, { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import Label, { LabelProps } from '../Label/Label';
import s from './Field.module.scss';

type FormInputFieldProps = {
  label?: LabelProps;
  children: ReactNode;
  errors?: FieldError;
};

export const FormField = ({ label, children, errors }: FormInputFieldProps) => (
  <div className={s.container}>
    {label && <Label {...label} />}
    {children}
    {errors && <span className={s['error-message']}>{errors.message}</span>}
  </div>
);
