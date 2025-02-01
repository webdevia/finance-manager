import React from 'react';
import style from './HomePage.module.scss';

export const HomePage = () => (
  <section className={style.container}>
    <h2>Finance Manager</h2>
    <p>
      {`Finance Manager is a comprehensive platform designed to simplify personal and business financial management. Our
      intuitive tools empower users to budget effectively, track expenses, monitor investments, and achieve their
      financial goals. Whether you're an individual looking to take control of your finances or a business aiming to
      streamline financial operations, Finance Manager provides the resources and insights you need to succeed. Our
      mission is to make financial management accessible, transparent, and stress-free for everyone.`}
    </p>
  </section>
);
