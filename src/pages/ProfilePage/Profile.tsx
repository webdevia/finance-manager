import React from 'react';
import ProfileForm from 'src/shared/ui/Forms/ProfileForm/ProfileForm';

import { useSelector } from 'react-redux';
import { RootState } from 'src/app/store';

export const Profile = () => {
  const { profile } = useSelector((state: RootState) => state.profile);

  return <ProfileForm profileInitialData={{ name: profile.name, description: profile.description }} />;
};
