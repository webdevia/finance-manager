import React, { ReactNode, MouseEvent, ButtonHTMLAttributes } from 'react';
import s from './Button.module.scss';
import cn from 'clsx';

export type ButtonProps = {
  children: ReactNode;
  stretch?: boolean;
  small?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, onClick, small, stretch, disabled = false, ...props }: ButtonProps) => (
  <button
    className={cn(s.button, { [s.stretch]: stretch }, { [s.small]: small })}
    onClick={onClick}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);

export default Button;
