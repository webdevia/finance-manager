import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useIsFieldRequired } from 'src/shared/zod';
import Form from 'src/shared/ui/Forms/Form/Form';
import InputField from 'src/shared/ui/Forms/FormFields/InputField/InputField';
import Button from 'src/shared/ui/Button/Button';
import ActionButtons from 'src/shared/ui/ActionButtons/ActionButtons';
import Title from 'src/shared/ui/Title/Title';
import { ErrorLabel } from 'src/shared/ui/ErrorLabel/ErrorLabel';
import { SignUpSchema, SignUpSchemaType } from './signup-schema';
import { AuthUserError } from 'src/features/auth/authSlice';

import style from './signUpForm.module.scss';

// TODO: Implement custom hook with state

export type OnSubmit = SubmitHandler<SignUpSchemaType>;

type SignUpFormProps = {
  onSubmit: OnSubmit;
  formTitle?: string;
  signUpButtonText?: string;
  authError: AuthUserError | null;
};

const SignUpForm = ({ onSubmit, signUpButtonText, formTitle, authError }: SignUpFormProps) => {
  const {
    reset,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    shouldUnregister: true,
    resolver: zodResolver(SignUpSchema),
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
  }, [authError, handleError, reset]);

  const withResetAndSetError = (onSubmit: OnSubmit) => (data: SignUpSchemaType) => {
    onSubmit(data);
  };

  const isRequired = useIsFieldRequired(SignUpSchema);

  type SignUpButtonProps = {
    text: string;
  };

  const SignUpButton = ({ text }: SignUpButtonProps) => (
    <Button type="submit" stretch>
      {text}
    </Button>
  );

  return (
    <div className={style.container}>
      <div className={style['sign-up-form']}>
        <span className={style.title}>
          <Title>{formTitle || 'Sign Up'}</Title>
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
              buttons={[{ button: <SignUpButton text={signUpButtonText || 'Sign up'} key="signUpButton" /> }]}
            />
          }
        />
      </div>
    </div>
  );
};

export default SignUpForm;
