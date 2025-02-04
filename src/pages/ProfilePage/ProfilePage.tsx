import React from 'react';
import { useSelector } from 'react-redux';
import { selectProfile } from 'src/features/profile/selectors';
import ProfileForm from 'src/shared/ui/Forms/ProfileForm/ProfileForm';

export const ProfilePage = () => {
  const { profile } = useSelector(selectProfile);

  return <ProfileForm profileInitialData={{ name: profile.name }} />;
};
