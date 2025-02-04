import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { fakeAuth } from 'src/shared/services/authService';
// import { setToken } from 'src/features/auth/authSlice';
// import { setProfile } from 'src/features/profile/profileSlice';
import SignInForm, { OnSubmit } from 'src/shared/ui/Forms/SignInForm/SignInForm';
import { signInUser, SignInUser, SignInUserError } from 'src/features/auth/authSlice';
import { SubmitHandler } from 'react-hook-form';
import { SignInSchemaType } from 'src/shared/ui/Forms/SignInForm/signin-schema';
import { AppDispatch, RootState } from 'src/app/store';
import { useSelector } from 'react-redux';


export const SignInPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authError = useSelector((state: RootState) => state.auth.error);


  const onLogin: SubmitHandler<SignInSchemaType> = (data) => {
    dispatch(signInUser(data));
    // console.dir(authError);
    return authError
  };
  /*  fakeAuth(data.email, data.password).then((user) => {
      dispatch(setToken(user.token));
      dispatch(setProfile(user));
      navigate('/operations'); 
    } */

  return <SignInForm signInError={authError} onSubmit={onLogin} />;
};
