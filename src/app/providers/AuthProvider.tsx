import React, { ReactNode, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';

import { fakeProfile } from 'src/shared/services/authService';
import { signOut } from 'src/features/auth/authSlice';
import { fetchProfile } from 'src/features/profile/profileSlice'; 
// import { clearProfile, setProfile } from 'src/features/profile/profileSlice';
import { initializeApp } from 'src/features/appSlice';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAppInitialized } = useSelector((state: RootState) => state.app);
  const { token } = useSelector((state: RootState) => state.auth);

  const logout = useCallback(() => {
    dispatch(signOut());
    // dispatch(clearProfile());
  }, [dispatch]);

  const getProfile = useCallback(() => dispatch(fetchProfile), [dispatch]);

  // const login = useCallback(
  //   async (token: string) => {
  //     try {
  //       const data = await fakeProfile(token);
  //       if (data) {
  //         dispatch(setToken(data.token));
  //         dispatch(setProfile(data));
  //       }
  //     } catch (error) {
  //       logout();
  //     }
  //   },
  //   [dispatch, logout]
  // );

  useEffect(() => {
   


    if (!isAppInitialized) {
      
      // const storedToken = localStorage.getItem('token');
      // if (storedToken) {
      //   fakeProfile(storedToken)
      //     .then((data) => {
      //       if (data) {
      //         dispatch(setToken(data.token));
      //         dispatch(setProfile(data));
      //       }
      //     })
      //     .catch(logout);
      // }

      if (token) {
        getProfile();
      } 

      dispatch(initializeApp());
    }
  }, [dispatch, logout, isAppInitialized]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'token') {
        const newToken = event.newValue;
        if (newToken) {
          getProfile();
        } else {
          logout();
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [getProfile, logout]);

  return <>{children}</>;
};
