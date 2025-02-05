import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/app/store';
import { fetchProfile, resetError, updateProfile } from 'src/features/profile/profileSlice';
import { selectProfile } from 'src/features/profile/selectors';
import ProfileForm, { OnSubmit, OnSubmitPassword } from 'src/shared/ui/Forms/ProfileForm/ProfileForm';
import { normalizeDateString } from 'src/shared/datetime-utils';
import { updatePassword } from 'src/features/profile/passwordSlice';

export const ProfilePage = () => {
  const [successInfo, setSuccessInfo] = useState('');
  const [passwordSuccessInfo, setPasswordSuccessInfo] = useState('');
  const { profile } = useSelector(selectProfile);
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
  }

  return (
    <ProfileForm
      changeProfileForm={{
        initialData: profile ? { ...profile, signUpDate: normalizeDateString(profile.signUpDate) } : null,
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
