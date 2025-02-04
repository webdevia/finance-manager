import React, { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SignInForm, { OnSubmit } from 'src/shared/ui/Forms/SignInForm/SignInForm';
import { resetError, signInUser } from 'src/features/auth/authSlice';
import { AppDispatch, RootState } from 'src/app/store';

export const SignInPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authError = useSelector((state: RootState) => state.auth.error);
  const authStatus = useSelector((state: RootState) => state.auth.status);

  useEffect(() => {
    authStatus === 'succeeded' && navigate('/');
  }, [authStatus]);

  useLayoutEffect(() => {
    dispatch(resetError());
  }, []);

  const onLogin: OnSubmit = (data) => {
    dispatch(signInUser(data));
  };

  return (
    <SignInForm
      authError={authError}
      onSubmit={onLogin}
      signInButtonText={authStatus === 'loading' ? 'Signing in...' : 'Sign in'}
    />
  );
};
