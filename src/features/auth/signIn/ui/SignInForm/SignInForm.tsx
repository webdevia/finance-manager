import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useIsFieldRequired } from 'src/shared/zod';
import Form from 'src/shared/ui/Forms/Form/Form';
import InputField from 'src/shared/ui/Forms/FormFields/InputField/InputField';
import Button from 'src/shared/ui/Button/Button';
import ActionButtons from 'src/shared/ui/ActionButtons/ActionButtons';
import Title from 'src/shared/ui/Title/Title';
import { ErrorLabel } from 'src/shared/ui/ErrorLabel/ErrorLabel';
import { SignInSchema, SignInSchemaType } from './signin.schema';
import { AuthUserError } from 'src/features/auth/authSlice';
import { SignInErrorableField, useSignIn } from 'src/features/auth/signIn/hooks/useSignIn';
import { HandledError } from 'src/shared/api/errors/errors';
import style from './signInForm.module.scss';

export type OnSubmit = SubmitHandler<SignInSchemaType>;

type SignInFormProps = {
  onSignIn: (token: string) => void;
};

export const SignInForm: React.FC<SignInFormProps> = ({ onSignIn }) => {
  const { handleSignIn, loading } = useSignIn();
  const isRequired = useIsFieldRequired(SignInSchema);

  const {
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

  const withResetAndSetError = (onSubmit: OnSubmit) => (data: SignInSchemaType) => {
    onSubmit(data);
  };

  const onSubmit: SubmitHandler<SignInSchemaType> = async (data) => {
    try {
      const token = await handleSignIn({ email: data.email, password: data.password });
      token && onSignIn(token);
    } catch (err) {
      const handledError = err as HandledError<SignInErrorableField>;
      handleError(handledError);
    }
  };

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
                disabled={loading}
              />
              <InputField
                label="Password"
                inputId="password"
                name="password"
                register={register}
                type="password"
                errors={errors.password}
                required={isRequired('password')}
                disabled={loading}
              />
              {errors.root && <ErrorLabel message={errors.root.message || ''} />}
            </>
          }
          buttons={
            <ActionButtons
              buttons={[
                {
                  button: (
                    <Button key={'signInButton'} type="submit" stretch disabled={loading}>
                      {loading ? 'Signing in...' : 'Sign In'}
                    </Button>
                  ),
                },
              ]}
            />
          }
        />
      </div>
    </div>
  );
};
