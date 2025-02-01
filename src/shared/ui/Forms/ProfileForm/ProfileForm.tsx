import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useIsFieldRequired } from 'src/shared/zod';
import Form from 'src/shared/ui/Forms/Form/Form';
import InputField from 'src/shared/ui/Forms/FormFields/InputField/InputField';
import Button from 'src/shared/ui/Button/Button';
import ActionButtons from 'src/shared/ui/ActionButtons/ActionButtons';
import Title from 'src/shared/ui/Title/Title';
import TextareaField from '../FormFields/TextareaField/TextareaField';
import { ZodEffects, ZodObject } from 'zod';
import {
  ChangeProfileSchema,
  ChangeProfileSchemaType,
  ChangePasswordSchema,
  ChangePasswordSchemaType,
} from './profile-schema';
import style from './ProfileForm.module.scss';

type ChangeProfileFormProps = {
  initialData?: ChangeProfileSchemaType;
};

const ChangeProfileForm = ({ initialData }: ChangeProfileFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeProfileSchemaType>({
    shouldUnregister: true,
    resolver: zodResolver(ChangeProfileSchema),
    defaultValues: initialData,
  });

  const onChangeProfile = (data: ChangeProfileSchemaType) => {
    console.log(data);
  };

  const isRequired = useIsFieldRequired(ChangeProfileSchema);

  const ChangeProfileButton = () => (
    <Button type="submit" stretch>
      Save
    </Button>
  );

  return (
    <div className={style['profile-form']}>
      <span className={style.title}>
        <Title>Change profile</Title>
      </span>
      <Form
        onSubmit={handleSubmit(onChangeProfile)}
        fields={
          <>
            <InputField
              label="Name"
              name="name"
              register={register}
              type="text"
              errors={errors.name}
              required={isRequired('name')}
            />
            <TextareaField
              label="Description"
              name="description"
              register={register}
              errors={errors.description}
              required={isRequired('description')}
            />
          </>
        }
        buttons={<ActionButtons buttons={[{ button: <ChangeProfileButton key="changeProfile" /> }]} />}
      />
    </div>
  );
};

const ChangePasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordSchemaType>({
    shouldUnregister: true,
    resolver: zodResolver(ChangePasswordSchema),
  });

  const onChangePassword = (data: ChangePasswordSchemaType) => {
    console.log(data);
  };

  const baseSchema = (ChangePasswordSchema as ZodEffects<ZodObject<any>>)._def.schema;
  const isRequired = useIsFieldRequired(baseSchema);

  const ChangePasswordButton = () => (
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
        onSubmit={handleSubmit(onChangePassword)}
        fields={
          <>
            <InputField
              label="Password"
              name="password"
              register={register}
              type="password"
              errors={errors.password}
              required={isRequired('password')}
            />
            <InputField
              label="New password"
              name="newPassword"
              register={register}
              type="password"
              errors={errors.newPassword}
              required={isRequired('newPassword')}
            />
            <InputField
              label="Confirm password"
              name="confirmPassword"
              register={register}
              type="password"
              errors={errors.confirmPassword}
              required={isRequired('confirmPassword')}
            />
          </>
        }
        buttons={<ActionButtons buttons={[{ button: <ChangePasswordButton key="changePassword" /> }]} />}
      />
    </div>
  );
};

type ProfileFormProps = {
  profileInitialData: ChangeProfileSchemaType;
};

const ProfileForm = ({ profileInitialData }: ProfileFormProps) => (
  <div className={style.container}>
    <ChangeProfileForm initialData={profileInitialData} />
    <ChangePasswordForm />
  </div>
);

export default ProfileForm;
