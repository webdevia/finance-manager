import React from 'react';
import style from './Logo.module.scss';

type LogoProps = {
  url: string;
};

const Logo = ({ url }: LogoProps) => <img className={style.logo} src={url} alt="Finance Manager Logo" />;

export default Logo;
