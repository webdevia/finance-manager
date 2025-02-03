import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useIsFieldRequired } from 'src/shared/zod';
import Form from 'src/shared/ui/Forms/Form/Form';
import InputField from 'src/shared/ui/Forms/FormFields/InputField/InputField';
import Button from 'src/shared/ui/Button/Button';
import ActionButtons from 'src/shared/ui/ActionButtons/ActionButtons';
import Title from 'src/shared/ui/Title/Title';
import { ErrorLabel } from 'src/shared/ui/ErrorLabel/ErrorLabel';
import { SignInSchema, SignInSchemaType } from './signin-schema';

import style from './signInForm.module.scss';

export type OnSubmit = (data: SignInSchemaType) => Promise<void>;

type SignInFormProps = {
  onSubmit: OnSubmit;
};

const SignInForm = ({ onSubmit }: SignInFormProps) => {
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

  const withResetAndSetError = (onSubmit: OnSubmit) => (data: SignInSchemaType) => {
    onSubmit(data)
      .then(() => reset())
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
          onSubmit={handleSubmit(withResetAndSetError(onSubmit))}
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
                label="Password"
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
