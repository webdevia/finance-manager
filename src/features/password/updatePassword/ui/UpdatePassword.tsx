import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useIsFieldRequired } from 'src/shared/zod';
import Form from 'src/shared/ui/Forms/Form/Form';
import InputField from 'src/shared/ui/Forms/FormFields/InputField/InputField';
import Button from 'src/shared/ui/Button/Button';
import ActionButtons from 'src/shared/ui/ActionButtons/ActionButtons';
import Title from 'src/shared/ui/Title/Title';
import { PasswordSchema, PasswordSchemaType } from '../contracts/updatePasswordContract';
import { PasswordErrorableField, useUpdatePassword } from '../hooks/useUpdatePassword';
import { HandledError } from 'src/shared/api/errors/errors';
import { ErrorLabel } from 'src/shared/ui/ErrorLabel/ErrorLabel';
import { InfoLabel } from 'src/shared/ui/InfoLabel/InfoLabel';
import style from './UpdatePassword.module.scss';

export const UpdatePassword: React.FC = () => {
    const [success, setSuccess] = useState(false);
    const { handleUpdatePassword, loading } = useUpdatePassword();
    
    const {
      register,
      handleSubmit,
      setError,
      formState: { errors },
    } = useForm<PasswordSchemaType>({
      shouldUnregister: true,
      resolver: zodResolver(PasswordSchema),
    });
  
  // TODO: make generic error handler
    const handleError = (passwordError: HandledError<PasswordErrorableField>) => {
      const { fields } = passwordError;
      fields.length > 1 && fields.forEach((field) => setError(field, { type: 'manual', message: '' }));

      setError(fields.length === 1 ? fields[0] : 'root', {
        type: 'manual',
        message: passwordError.message,
      });
    };
  
  const onSubmit: SubmitHandler<PasswordSchemaType> = async (data) => {
    setSuccess(false);
    try {
      await handleUpdatePassword({ password: data.password, newPassword: data.newPassword });
      setSuccess(true);
    } catch (err) {
      const handledError = err as HandledError<PasswordErrorableField>;
      handleError(handledError);
    }
  };

    return (
      <div className={style['password-form']}>
        <span className={style.title}>
          <Title>Change password</Title>
        </span>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          fields={
            <>
              <InputField
                label="Password"
                inputId="password"
                name="password"
                register={register}
                type="password"
                errors={errors.password}
                required={true}
              />
              <InputField
                label="New password"
                inputId="newPassword"
                name="newPassword"
                register={register}
                type="password"
                errors={errors.newPassword}
                required={true}
              />
              <InputField
                label="Confirm password"
                inputId="newPasswordConfirm"
                name="newPasswordConfirm"
                register={register}
                type="password"
                errors={errors.newPasswordConfirm}
                required={true}
              />
              {errors.root && <ErrorLabel message={errors.root.message || ''} />}
              {success && <InfoLabel message={'Password changed successfully'} />}
            </>
          }
          buttons={
            <ActionButtons
              buttons={[
                {
                  button: (
                    <Button key={'updatePasswordButton'} type="submit" stretch disabled={loading}>
                      {loading ? 'Updating...' : 'Change password'}
                    </Button>
                  ),
                },
              ]}
            />
          }
        />
      </div>
    );
  };
  