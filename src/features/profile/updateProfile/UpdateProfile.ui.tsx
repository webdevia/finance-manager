import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useIsFieldRequired } from 'src/shared/zod';
import Form from 'src/shared/ui/Forms/Form/Form';
import InputField from 'src/shared/ui/Forms/FormFields/InputField/InputField';
import Button from 'src/shared/ui/Button/Button';
import ActionButtons from 'src/shared/ui/ActionButtons/ActionButtons';
import Title from 'src/shared/ui/Title/Title';
import { ProfileSchema, ProfileSchemaType } from './updateProfile.contracts';
import { ProfileErrorableField, useUpdateProfile } from './hooks/useUpdateProfile';
import { useGetProfile } from './hooks/useGetProfile';
import { HandledError } from 'src/shared/api/errors/errors';
import { ErrorLabel } from 'src/shared/ui/ErrorLabel/ErrorLabel';
import { InfoLabel } from 'src/shared/ui/InfoLabel/InfoLabel';
import style from './ProfileForm.module.scss';

export const UpdateProfile: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const { handleUpdateProfile, loading } = useUpdateProfile();
  const { getProfile } = useGetProfile();
  const isRequired = useIsFieldRequired(ProfileSchema);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ProfileSchemaType>({
    shouldUnregister: true,
    resolver: zodResolver(ProfileSchema),
  });

  // TODO: make generic error handler
  const handleError = (profileError: HandledError<ProfileErrorableField>) => {
    const { fields } = profileError;
    fields.length > 1 && fields.forEach((field) => setError(field, { type: 'manual', message: '' }));

    setError(fields.length === 1 ? fields[0] : 'root', {
      type: 'manual',
      message: profileError.message,
    });
  };

  useEffect(() => {
    getProfile().then((data) => {
      data && reset(data);
    });
  }, []);

  const onSubmit: SubmitHandler<ProfileSchemaType> = async (data) => {
    setSuccess(false);
    try {
      await handleUpdateProfile({ name: data.name });
      setSuccess(true);
    } catch (err) {
      const handledError = err as HandledError<ProfileErrorableField>;
      handleError(handledError);
    }
  };

  return (
    <div className={style['profile-form']}>
      <span className={style.title}>
        <Title>Change profile</Title>
      </span>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        fields={
          <>
            <InputField
              label="Id"
              inputId="id"
              name="id"
              register={register}
              type="text"
              errors={errors.id}
              required={isRequired('id')}
              readOnly
              disabled={loading}
            />
            <InputField
              label="Name"
              inputId="name"
              name="name"
              register={register}
              type="text"
              errors={errors.name}
              required={isRequired('name')}
              disabled={loading}
            />
            <InputField
              label="Email"
              inputId="email"
              name="email"
              register={register}
              type="email"
              errors={errors.email}
              required={isRequired('email')}
              readOnly
              disabled={loading}
            />
            <InputField
              label="Sign up date"
              inputId="signUpDate"
              name="signUpDate"
              register={register}
              type="date"
              errors={errors.signUpDate}
              required={isRequired('signUpDate')}
              readOnly
              disabled={loading}
            />
            {errors.root && <ErrorLabel message={errors.root.message || ''} />}
            {success && <InfoLabel message={'Profile updated successfully'} />}
          </>
        }
        buttons={
          <ActionButtons
            buttons={[
              {
                button: (
                  <Button key={'updateProfileButton'} type="submit" stretch disabled={loading}>
                    {loading ? 'Updating...' : 'Update profile'}
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
