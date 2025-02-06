import React from 'react';
import { UpdateProfile } from 'src/features/profile/updateProfile/UpdateProfile.ui';
import style from './Profile.module.scss';

export const ProfilePage = () => {
  return (
    <div className={style.container}>
      <UpdateProfile />
    </div>
  );
};
