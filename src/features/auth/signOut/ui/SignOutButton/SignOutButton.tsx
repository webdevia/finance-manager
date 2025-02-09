import React from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from 'src/features/auth/authSlice';

interface SignOutButtonProps {
  className?: string;
}

export const SignOutButton: React.FC<SignOutButtonProps> = ({ className }) => {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
  };
  return (
    <a className={className} onClick={handleSignOut}>
      Sign out
    </a>
  );
};
