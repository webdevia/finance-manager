import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SignInForm } from 'src/features/auth/signIn/ui/SignInForm';
import { setToken } from 'src/features/auth/authSlice';
import { AppDispatch } from 'src/app/store';

export const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const onLogin = (token: string) => {
    dispatch(setToken(token));
    navigate('/');
  };

  return <SignInForm onSignIn={onLogin} />;
};
