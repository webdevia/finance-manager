import React from 'react';
import { useDispatch } from 'react-redux';
import { clearToken } from '../auth/authSlice';
import { clearProfile } from '../profile/profileSlice';

interface SignOutButtonProps {
  className?: string;
}

export const SignOutButton: React.FC<SignOutButtonProps> = ({ className }) => {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(clearToken());
    dispatch(clearProfile());
  };
  return (
    <a className={className} onClick={handleSignOut}>
      Sign out
    </a>
  );
};
