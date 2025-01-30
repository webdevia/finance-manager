import React, { useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useIsFieldRequired } from '../../../zod';
import Form from '../Form/Form';
import InputField from '../FormFields/InputField/InputField';
import Button from '../../Button/Button';
import ActionButtons from '../../ActionButtons/ActionButtons';
import Title from '../../Title/Title';

import { useDispatch } from 'react-redux';
import { setToken, setProfile, clearToken, clearProfile } from 'src/features/authSlice';

import { SignInSchema, SignInSchemaType } from './signin-schema';

import style from './signInForm.module.scss';

const SignInForm = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchemaType>({
    shouldUnregister: true,
    resolver: zodResolver(SignInSchema),
  });

  const [username, setUsername] = useState('');
  const dispatch = useDispatch();

  const OnLogin = (data: SignInSchemaType) => {
    const fakeToken = '123456';
    dispatch(setToken(fakeToken));
    dispatch(setProfile({ username, isAdmin: username.startsWith('admin') }));
    console.log(data);
    reset();
  };

  const isRequired = useIsFieldRequired(SignInSchema);

  const LoginButton = () => (
      <Button type="submit" stretch>Submit</Button>
  );

  return (
    <div className={style.container}>
      <div className={style['sign-in-form']}>
        <span className={style.title}><Title>Sign In</Title></span> 
        <Form
          onSubmit={handleSubmit(OnLogin)}
          fields={
            <>
              <InputField
                label="Email"
                name="email"
                register={register}
                type="email"
                errors={errors.email}
                required={isRequired('email')}
                onChange={(e) => setUsername(e.target.value)}
              />
              <InputField
                label="Пароль"
                name="password"
                register={register}
                type="password"
                errors={errors.password}
                required={isRequired('password')}
              />
            </>
          }
          buttons={<ActionButtons buttons={[{ button: <LoginButton key="loginButton" /> }]} />}
        />
      </div>
    </div>
  );
};

export default SignInForm;
