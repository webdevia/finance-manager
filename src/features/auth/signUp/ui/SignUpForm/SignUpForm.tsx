import React from 'react';
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
import { SignUpErrorableField, useSignUp } from 'src/features/auth/signUp/hooks/useSignUp';
import { HandledError } from 'src/shared/api/errors/errors';
import { COMMAND_ID } from 'src/shared/consts';

export type OnSubmit = SubmitHandler<SignUpSchemaType>;

type SignUpFormProps = {
  onSignUp: (token: string) => void;
};

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUp }: SignUpFormProps) => {
  const { handleSignUp, loading } = useSignUp();
  const isRequired = useIsFieldRequired(SignUpSchema);

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

  const handleError = (signUpError: AuthUserError) => {
    const { fields } = signUpError;

    fields.length > 1 && fields.forEach((field) => setError(field, { type: 'manual', message: '' }));

    setError(fields.length === 1 ? fields[0] : 'root', {
      type: 'manual',
      message: signUpError.message,
    });
  };

  const withResetAndSetError = (onSubmit: OnSubmit) => (data: SignUpSchemaType) => {
    onSubmit(data);
  };

  const onSubmit: SubmitHandler<SignUpSchemaType> = async (data) => {
    try {
      const token = await handleSignUp({ email: data.email, password: data.password, commandId: COMMAND_ID });
      token && onSignUp(token);
    } catch (err) {
      const handledError = err as HandledError<SignUpErrorableField>;
      handleError(handledError);
    }
  };

  return (
    <div className={style.container}>
      <div className={style['sign-up-form']}>
        <span className={style.title}>
          <Title>Sign Up</Title>
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
              buttons={[
                {
                  button: (
                    <Button key={'signUpButton'} type="submit" stretch disabled={loading}>
                      {loading ? 'Signing up...' : 'Sign Up'}
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
