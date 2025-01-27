import React, { ReactNode } from 'react';
import s from './Label.module.scss';

export type LabelProps = {
  children: ReactNode;
  required: boolean;
};

const Label = ({ children, required }: LabelProps) => <label className={s.label}>{children} {required && <span className={s.required}>*</span>}</label>;
export default Label