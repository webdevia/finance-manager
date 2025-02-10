import React from 'react';
import { UpdateProfile } from 'src/features/profile/updateProfile/UpdateProfile.ui';
import style from './Profile.module.scss';
import { UpdatePassword } from 'src/features/password/updatePassword/ui/UpdatePassword';

export const ProfilePage = () => {
  return (
    <div className={style.container}>
      <UpdateProfile />
      <UpdatePassword />
    </div>
  );
};
