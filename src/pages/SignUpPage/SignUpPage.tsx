import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SignUpForm } from 'src/features/auth/signUp/ui/SignUpForm/SignUpForm';
import { setToken } from 'src/features/auth/authSlice';
import { AppDispatch } from 'src/app/store';

export const SignUpPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onLogin = (token: string) => {
    dispatch(setToken(token));
    navigate('/');
  };

  return (
    <SignUpForm onSignUp={onLogin} />
  );
};
