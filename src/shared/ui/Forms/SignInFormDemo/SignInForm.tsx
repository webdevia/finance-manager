import React, { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useIsFieldRequired } from '../../../zod';
import Form from '../Form/Form';
import InputField from '../FormFields/InputField/InputField';

import { SignInSchema, SignInSchemaType } from './signin-schema';
import Title from '../../Title/Title';

export type OnSubmit = (data: SignInSchemaType) => void;

type SignInFormProps = {
  onSubmit: OnSubmit;
  buttons: ReactNode;
};

const SignInForm = ({ onSubmit, buttons }: SignInFormProps) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchemaType>({
    shouldUnregister: true,
    resolver: zodResolver(SignInSchema),
  });

  const withReset = (onSubmit: OnSubmit) => (data: SignInSchemaType) => {
    onSubmit(data);
    reset();
  };

  const isRequired = useIsFieldRequired(SignInSchema);

  return (<>
    <Title>Login</Title>
    <Form
      onSubmit={handleSubmit(withReset(onSubmit))}
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
        </>
      }
      buttons={buttons}
    /></>
  );
};

export default SignInForm;
