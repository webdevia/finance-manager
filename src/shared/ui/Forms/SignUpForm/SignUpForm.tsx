import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useIsFieldRequired } from 'src/shared/zod';
import Form from 'src/shared/ui/Forms/Form/Form';
import InputField from 'src/shared/ui/Forms/FormFields/InputField/InputField';
import Button from 'src/shared/ui/Button/Button';
import ActionButtons from 'src/shared/ui/ActionButtons/ActionButtons';
import Title from 'src/shared/ui/Title/Title';
import { ErrorLabel } from 'src/shared/ui/ErrorLabel/ErrorLabel';
import { InfoLabel } from 'src/shared/ui/InfoLabel/InfoLabel';
import { SignUpSchema, SignUpSchemaType } from './signup-schema';

import style from './signUpForm.module.scss';

export type OnSubmit = (data: SignUpSchemaType) => Promise<string>;

type SignUpFormProps = {
  onSubmit: OnSubmit;
  signUpButtonText?: string;
  formTitle?: string;
};

const SignUpForm = ({ onSubmit, signUpButtonText, formTitle }: SignUpFormProps) => {
  const [info, setInfo] = useState<string>('');

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

  const withResetAndSetError = (onSubmit: OnSubmit) => (data: SignUpSchemaType) => {
    setInfo("");
    onSubmit(data)
      .then((info) => setInfo(info))
      .then(() => reset())
      .catch((error) =>
        setError('root', {
          type: 'manual',
          message: error.message,
        })
      );
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
          <Title>{formTitle || "Sign Up"}</Title>
        </span>
        <Form
          onSubmit={handleSubmit(withResetAndSetError(onSubmit))}
          fields={
            <>
              <InputField
                label="Email"
                name="email"
                register={register}
                type="text"
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
              {info && <InfoLabel message={info} />}
            </>
          }
          buttons={
            <ActionButtons buttons={[{ button: <SignUpButton text={signUpButtonText || "Submit"} key="signUpButton" /> }]} />
          }
        />
      </div>
    </div>
  );
};

export default SignUpForm;
