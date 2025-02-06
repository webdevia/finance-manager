import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useIsFieldRequired } from 'src/shared/zod';
import Form from 'src/shared/ui/Forms/Form/Form';
import InputField from 'src/shared/ui/Forms/FormFields/InputField/InputField';
import Button from 'src/shared/ui/Button/Button';
import ActionButtons from 'src/shared/ui/ActionButtons/ActionButtons';
import Title from 'src/shared/ui/Title/Title';
import { ProfileError } from 'src/features/profile/profileSlice';
import { PasswordError } from 'src/features/profile/passwordSlice';
import { ZodEffects, ZodObject } from 'zod';
import {
  ChangeProfileSchema,
  ChangeProfileSchemaType,
  ChangePasswordSchema,
  ChangePasswordSchemaType,
} from './profile-schema';
import style from './ProfileForm.module.scss';
import { ErrorLabel } from '../../ErrorLabel/ErrorLabel';
import { InfoLabel } from '../../InfoLabel/InfoLabel';
// import { UpdateProfileButton } from 'src/features/profile/updateProfile/UpdateProfile.ui';

export type OnSubmit = SubmitHandler<Pick<ChangeProfileSchemaType, 'name'>>;
export type OnSubmitPassword = SubmitHandler<ChangePasswordSchemaType>;

type ChangeProfileFormProps = {
  initialData?: ChangeProfileSchemaType;
  onSubmit: OnSubmit;
  changeProfileButtonText: string;
  profileError: ProfileError | null;
  successInfo: string;
};

type ChangePasswordFormProps = {
  // initialData?: ChangePasswordSchemaType;
  onSubmit: OnSubmitPassword;
  changePasswordButtonText: string;
  passwordError: PasswordError | null;
  successInfo: string;
};

const ChangeProfileForm: React.FC<ChangeProfileFormProps> = ({
  initialData,
  onSubmit,
  changeProfileButtonText,
  profileError,
  successInfo,
}: ChangeProfileFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ChangeProfileSchemaType>({
    shouldUnregister: true,
    resolver: zodResolver(ChangeProfileSchema),
  });

  const handleError = (profileError: ProfileError) => {
    const { fields } = profileError;

    fields.length > 1 && fields.forEach((field) => setError(field, { type: 'manual', message: '' }));

    setError(fields.length === 1 ? fields[0] : 'root', {
      type: 'manual',
      message: profileError.message,
    });
  };

  useEffect(() => {
    initialData && reset(initialData);
  }, [initialData?.name]);

  useEffect(() => {
    profileError ? handleError(profileError) : reset(initialData);
  }, [profileError]);

  const isRequired = useIsFieldRequired(ChangeProfileSchema);

  type ChangeProfileButtonProps = {
    text: string;
  };

  const ChangeProfileButton = ({ text }: ChangeProfileButtonProps) => (
    <Button type="submit" stretch>
      {text}
    </Button>
  );

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
            />
            <InputField
              label="Name"
              inputId="name"
              name="name"
              register={register}
              type="text"
              errors={errors.name}
              required={isRequired('name')}
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
            />
            {errors.root && <ErrorLabel message={errors.root.message || ''} />}
            {successInfo && <InfoLabel message={successInfo} />}
          </>
        }
        buttons={<ActionButtons buttons={[]} />}
      />
    </div>
  );
};

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  onSubmit,
  changePasswordButtonText,
  passwordError,
  successInfo,
}: ChangePasswordFormProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ChangePasswordSchemaType>({
    shouldUnregister: true,
    resolver: zodResolver(ChangePasswordSchema),
  });

  const handleError = (passwordError: PasswordError) => {
    const { fields } = passwordError;

    fields.length > 1 && fields.forEach((field) => setError(field, { type: 'manual', message: '' }));

    setError(fields.length === 1 ? fields[0] : 'root', {
      type: 'manual',
      message: passwordError.message,
    });
  };

  useEffect(() => {
    passwordError && handleError(passwordError);
  }, [passwordError]);

  const onChangePassword = (data: ChangePasswordSchemaType) => {
    //console.log(data);
  };

  const baseSchema = (ChangePasswordSchema as ZodEffects<ZodObject<any>>)._def.schema;
  const isRequired = useIsFieldRequired(baseSchema);

  type ChangePasswordButtonProps = {
    text: string;
  };

  const ChangePasswordButton = ({ text }: ChangePasswordButtonProps) => (
    <Button type="submit" stretch>
      Save
    </Button>
  );

  return (
    <div className={style['profile-form']}>
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
              required={isRequired('password')}
            />
            <InputField
              label="New password"
              inputId="newPassword"
              name="newPassword"
              register={register}
              type="password"
              errors={errors.newPassword}
              required={isRequired('newPassword')}
            />
            <InputField
              label="Confirm password"
              inputId="confirmPassword"
              name="confirmPassword"
              register={register}
              type="password"
              errors={errors.confirmPassword}
              required={isRequired('confirmPassword')}
            />
            {errors.root && <ErrorLabel message={errors.root.message || ''} />}
            {successInfo && <InfoLabel message={successInfo} />}
          </>
        }
        buttons={
          <ActionButtons
            buttons={[
              { button: <ChangePasswordButton text={changePasswordButtonText || 'Save'} key="changePassword" /> },
            ]}
          />
        }
      />
    </div>
  );
};

type ProfileFormProps = {
  changeProfileForm: ChangeProfileFormProps;
  changePasswordForm: ChangePasswordFormProps;
};

const ProfileForm = ({ changeProfileForm, changePasswordForm }: ProfileFormProps) => (
  <div className={style.container}>
    <ChangeProfileForm {...changeProfileForm} />
    <ChangePasswordForm {...changePasswordForm} />
  </div>
);

export default ProfileForm;
