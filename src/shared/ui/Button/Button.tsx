import React, { ReactNode, MouseEvent, ButtonHTMLAttributes } from 'react';
import s from './Button.module.scss';

type ButtonProps = {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, onClick, disabled = false, ...props }: ButtonProps) => (
  <button className={s.button} onClick={onClick} disabled={disabled} {...props}>
    {children}
  </button>
);

export default Button;
