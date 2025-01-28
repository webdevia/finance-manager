import React from 'react';
import style from './ProfileForm.module.scss';
import { ProfileCompletedForm } from './ProfileCompletedForm/ProfileCompletedForm';
import { ChangePasswordCompletedForm } from './ChangePasswordCompletedForm/ChangePasswordCompletedForm';

export const ProfileForm: React.FC = () => {
  return (
    <div className={style.profileForm}>
      <ProfileCompletedForm />
      <hr />
      <ChangePasswordCompletedForm />
    </div>
  );
};
