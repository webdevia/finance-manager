import React, { ReactNode } from 'react';
import s from './Label.module.scss';

export type LabelProps = {
  children: ReactNode;
  required: boolean;
  inputId: string;
};

const Label = ({ children, inputId, required }: LabelProps) => (
  <label htmlFor={inputId} className={s.label}>
    {children} {required && <span className={s.required}>*</span>}
  </label>
);
export default Label;
