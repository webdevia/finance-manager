import React from 'react';
import LeftRightLayout from '../../shared/ui/Layouts/LeftRightLayout/LeftRightLayout';
import { Navigation } from '../Navigation/Navigation';
import Logo from 'src/shared/ui/Logo/Logo';
import logo from '../../shared/assets/logo.svg';
import style from './header.module.scss';

const LeftSide: React.FC = () => (
  <div className={style.gap}>
    <Logo url={logo} />
    <h3>Finance Manager</h3>
  </div>
);

export const Header: React.FC = () => {
  return (
    <header className={style.header}>
      {/* <LeftRightLayout left={<div className={style["logo-container"]} ><div className={style.logo}><Logo url={logo} /></div><div>Finance Manager</div></div> } right={<Navigation />} /> */}
      <LeftRightLayout left={<LeftSide />} right={<Navigation />} />
    </header>
  );
};
