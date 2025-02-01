import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fakeAuth } from 'src/shared/services/authService';
import { setToken } from 'src/features/auth/authSlice';
import { setProfile } from 'src/features/profile/profileSlice';
import SignInForm, { OnSubmit } from 'src/shared/ui/Forms/SignInForm/SignInForm';

export const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin: OnSubmit = (data) =>
    fakeAuth(data.email, data.password).then((user) => {
      dispatch(setToken(user.token));
      dispatch(setProfile(user));
      navigate('/operations');
    });

  return <SignInForm onSubmit={onLogin} />;
};
