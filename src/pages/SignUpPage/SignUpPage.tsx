import React, { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SignUpForm, { OnSubmit } from 'src/shared/ui/Forms/SignUpForm/SignUpForm';
import { resetError, signUpUser } from 'src/features/auth/authSlice';
import { AppDispatch, RootState } from 'src/app/store';

import { COMMAND_ID } from 'src/shared/consts';

export const SignUpPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authError = useSelector((state: RootState) => state.auth.error);
  const authStatus = useSelector((state: RootState) => state.auth.status);

  useEffect(() => {
    authStatus === 'succeeded' && navigate('/');
  }, [authStatus, navigate]);

  useLayoutEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  const onLogin: OnSubmit = (data) => {
    dispatch(signUpUser({ ...data, commandId: COMMAND_ID }));
  };

  return (
    <SignUpForm
      authError={authError}
      onSubmit={onLogin}
      signUpButtonText={authStatus === 'loading' ? 'Signing up...' : 'Sign up'}
    />
  );
};
