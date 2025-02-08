import React from 'react';
import { NavLink } from 'react-router-dom';
import { SignOutButton } from 'src/features/SignOutButton/SignOutButton';
import { useSelector } from 'react-redux';
import { RootState } from 'src/app/store';

import style from './navigation.module.scss';

export const getNavLinkStyle = ({ isActive }: { isActive: boolean }) => {
  return {
    fontWeight: isActive ? 'bold' : 'normal',
  };
};

export const Navigation = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const isAuthenticated = !!token;

  return (
    <>
      <NavLink to={'/'} className={style['nav-btn']} style={getNavLinkStyle} end>
        Home
      </NavLink>
      {isAuthenticated ? (
        <>
          <NavLink to={'/profile'} className={style['nav-btn']} style={getNavLinkStyle}>
            Profile
          </NavLink>
          <NavLink to={'/operations'} className={style['nav-btn']} style={getNavLinkStyle}>
            Operations
          </NavLink>
          <SignOutButton className={style['nav-btn']} />
        </>
      ) : (
        <>
          <NavLink to={'/signin'} className={style['nav-btn']} style={getNavLinkStyle}>
            Sign In
          </NavLink>
          <NavLink to={'/signup'} className={style['nav-btn']} style={getNavLinkStyle}>
            Sign Up
          </NavLink>
        </>
      )}
    </>
  );
};
