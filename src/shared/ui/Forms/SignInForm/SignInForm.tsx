import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useIsFieldRequired } from '../../../zod';
import Form from '../Form/Form';
import InputField from '../FormFields/InputField/InputField';
import Button from '../../Button/Button';
import ActionButtons from '../../ActionButtons/ActionButtons';
import Title from '../../Title/Title';

import { useDispatch } from 'react-redux';
import { setToken } from 'src/features/auth/authSlice';
import { setProfile } from 'src/features/profile/profileSlice';
import { fakeAuth } from 'src/shared/services/authService';

import { SignInSchema, SignInSchemaType } from './signin-schema';

import style from './signInForm.module.scss';
import { useNavigate } from 'react-router-dom';

import { ErrorLabel } from 'src/shared/ErrorLabel/ErrorLabel';

const SignInForm = () => {
  const {
    reset,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInSchemaType>({
    shouldUnregister: true,
    resolver: zodResolver(SignInSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const OnLogin = (data: SignInSchemaType) => {
    fakeAuth(data.email, data.password)
      .then((user) => {
        dispatch(setToken(user.token));
        dispatch(setProfile(user));
        reset();
        navigate('/operations');
      })
      .catch((error) =>
        setError('root', {
          type: 'manual',
          message: error.message,
        })
      );
  };

  const isRequired = useIsFieldRequired(SignInSchema);

  const LoginButton = () => (
    <Button type="submit" stretch>
      Submit
    </Button>
  );

  return (
    <div className={style.container}>
      <div className={style['sign-in-form']}>
        <span className={style.title}>
          <Title>Sign In</Title>
        </span>
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
              />
              <InputField
                label="Пароль"
                name="password"
                register={register}
                type="password"
                errors={errors.password}
                required={isRequired('password')}
              />
              {errors.root && <ErrorLabel message={errors.root.message} />}
            </>
          }
          buttons={<ActionButtons buttons={[{ button: <LoginButton key="loginButton" /> }]} />}
        />
      </div>
    </div>
  );
};

export default SignInForm;
