import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
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
import { AuthUserError } from 'src/features/auth/authSlice';

export type OnSubmit = SubmitHandler<SignInSchemaType>;

type SignInFormProps = {
  onSubmit: OnSubmit;
  signInButtonText: string;
  authError: AuthUserError | null;
};

const SignInForm = ({ onSubmit, signInButtonText, authError }: SignInFormProps) => {
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

  const handleError = (signInError: AuthUserError) => {
    const { fields } = signInError;

    fields.length > 1 && fields.forEach((field) => setError(field, { type: 'manual', message: '' }));

    setError(fields.length === 1 ? fields[0] : 'root', {
      type: 'manual',
      message: signInError.message,
    });
  };

  useEffect(() => {
    authError ? handleError(authError) : reset();
  }, [authError]);

  const withResetAndSetError = (onSubmit: OnSubmit) => (data: SignInSchemaType) => {
    onSubmit(data);
  };

  const isRequired = useIsFieldRequired(SignInSchema);

  type SignInButtonProps = {
    text: string;
  };

  const SignInButton = ({ text }: SignInButtonProps) => (
    <Button type="submit" stretch>
      {text}
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
                inputId="email"
                name="email"
                register={register}
                type="email"
                errors={errors.email}
                required={isRequired('email')}
              />
              <InputField
                label="Password"
                inputId="password"
                name="password"
                register={register}
                type="password"
                errors={errors.password}
                required={isRequired('password')}
              />
              {errors.root && <ErrorLabel message={errors.root.message || ''} />}
            </>
          }
          buttons={
            <ActionButtons
              buttons={[{ button: <SignInButton text={signInButtonText || 'Sign in'} key="loginButton" /> }]}
            />
          }
        />
      </div>
    </div>
  );
};

export default SignInForm;
