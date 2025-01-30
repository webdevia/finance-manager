import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import style from './layout.module.scss';

export const Layout: React.FC = () => {
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
