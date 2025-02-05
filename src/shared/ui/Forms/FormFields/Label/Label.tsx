import React, { ReactNode } from 'react';
import s from './Label.module.scss';
import cn from 'clsx';

export type LabelProps = {
  children: ReactNode;
  required: boolean;
  inputId: string;
};

const Label = ({ children, inputId, required }: LabelProps) => (
  <label className={cn(s.label, { [s.required]: required })} htmlFor={inputId}>
    {children}
  </label>
);
export default Label;
