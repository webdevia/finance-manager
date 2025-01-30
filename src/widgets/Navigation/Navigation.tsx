import React from 'react';
import style from './navigation.module.scss';
import { Link } from 'react-router-dom';
import { SignOutButton } from 'src/features/SignOutButton/SignOutButton';

export const Navigation = () => (
    <>
        <Link to={"/"} ><button className={style['nav-btn']}>Home</button></Link>
        <Link to={"/signin"}><button className={style['nav-btn']}>Sign In</button></Link>
        <Link to={"/signup"}><button className={style['nav-btn']}>Sign Up</button></Link>
        <Link to={"/profile"}><button className={style['nav-btn']}>Profile</button></Link>
        <Link to={"/operations"}><button className={style['nav-btn']}>Operations</button></Link>
        <SignOutButton className={style['nav-btn']} />
        <Link to={"/operation-new-test"}><button className={style['nav-btn']}>New Operation Test</button></Link>
    </>
);
