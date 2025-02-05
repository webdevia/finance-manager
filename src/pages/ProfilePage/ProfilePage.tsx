import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/app/store';
import { fetchProfile, resetError, updateProfile } from 'src/features/profile/profileSlice';
import { selectProfile } from 'src/features/profile/selectors';
import ProfileForm, { OnSubmit } from 'src/shared/ui/Forms/ProfileForm/ProfileForm';
import { normalizeDateString } from 'src/shared/datetime-utils';

export const ProfilePage = () => {
  const [successInfo, setSuccessInfo] = useState('');
  const { profile } = useSelector(selectProfile);
  const profileStatus = useSelector((state: RootState) => state.profile.status);
  const profileError = useSelector((state: RootState) => state.profile.error);
  const dispatch = useDispatch<AppDispatch>();

  useLayoutEffect(() => {
    dispatch(resetError());
  }, []);

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  useEffect(() => {
    setSuccessInfo(profileStatus === 'update_succeeded' ? 'Profile updated successfully' : '');
  }, [profileStatus]);

  const onChangeProfile: OnSubmit = (data) => {
    dispatch(updateProfile({ input: { name: data.name } }));
  };

  return (
    <ProfileForm
      changeProfileForm={{
        initialData: profile ? { ...profile, signUpDate: normalizeDateString(profile.signUpDate) } : null,
        successInfo,
        onSubmit: onChangeProfile,
        changeProfileButtonText: profileStatus === 'update_loading' ? 'Updating...' : 'Save',
        profileError,
      }}
    />
  );
};
