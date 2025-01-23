import React, { ReactNode } from 'react';
import s from './Shorter.scss';

type ShortProps = {
  children: ReactNode;
};

const Short = ({ children }: ShortProps) => <span className={s.short}>{children}</span>;
export default Short;
