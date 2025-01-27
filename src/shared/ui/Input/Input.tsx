import React, { InputHTMLAttributes } from 'react';
import s from './Input.module.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = (props: InputProps) => (
  <input className={s.input} {...props} />
);

export default Input;
