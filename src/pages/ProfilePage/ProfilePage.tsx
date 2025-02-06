import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/app/store';
import { fetchProfile, resetError, updateProfile } from 'src/features/profile/profileSlice';
import { selectProfile } from 'src/features/profile/selectors';
import ProfileForm, { OnSubmit, OnSubmitPassword } from 'src/shared/ui/Forms/ProfileForm/ProfileForm';
import { normalizeDateString } from 'src/shared/datetime-utils';
import { updatePassword } from 'src/features/profile/passwordSlice';

import { useQuery, useMutation } from '@apollo/client';
import { PROFILE_MUTATION, PROFILE_QUERY } from 'src/features/profile/api/profile';
import { Profile } from 'src/shared/api/profile/profile';
import { ChangeProfileSchemaType } from 'src/shared/ui/Forms/ProfileForm/profile-schema';

export const ProfilePage = () => {
  const [successInfo, setSuccessInfo] = useState('');
  const [passwordSuccessInfo, setPasswordSuccessInfo] = useState('');
  const { data, loading, error } = useQuery<{ profile: Profile }>(PROFILE_QUERY);
  // const { profile } = useSelector(selectProfile);
  const profileStatus = useSelector((state: RootState) => state.profile.status);
  const profileError = useSelector((state: RootState) => state.profile.error);
  const passwordStatus = useSelector((state: RootState) => state.password.status);
  const passwordError = useSelector((state: RootState) => state.password.error);
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

  useEffect(() => {
    setPasswordSuccessInfo(passwordStatus === 'update_succeeded' ? 'Password updated successfully' : '');
  }, [passwordSuccessInfo]);

  const onChangeProfile: OnSubmit = (data) => {
    dispatch(updateProfile({ input: { name: data.name } }));
  };

  const onChangePassword: OnSubmitPassword = (data) => {
    dispatch(updatePassword({ input: { password: data.password, newPassword: data.newPassword } }));
  };

  return (
    <ProfileForm
      changeProfileForm={{
        initialData: data?.profile
          ? ({ ...data.profile, signUpDate: normalizeDateString(data.profile.signUpDate) } as ChangeProfileSchemaType)
          : null,
        successInfo,
        onSubmit: onChangeProfile,
        changeProfileButtonText: profileStatus === 'update_loading' ? 'Updating...' : 'Save',
        profileError,
      }}
      changePasswordForm={{
        successInfo: passwordSuccessInfo,
        onSubmit: onChangePassword,
        changePasswordButtonText: passwordStatus === 'loading' ? 'Updating...' : 'Save',
        passwordError,
      }}
    />
  );
};
