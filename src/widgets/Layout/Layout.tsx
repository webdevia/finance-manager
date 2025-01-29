import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
// import { useThemeContext, Theme } from "../theme/ThemeProvider";
import style from './layout.module.scss';
import cn from 'clsx';

export const Layout: React.FC = () => {
  // const themeContext = useThemeContext();

  return (
    <div className={style.layout}>
      <Header />
      <article className={style.container}>
        <Outlet />
      </article>
      <Footer />
    </div>
  );
};
