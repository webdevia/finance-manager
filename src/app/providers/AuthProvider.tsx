import React, { ReactNode, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { signOut } from 'src/features/auth/authSlice';
import { clearProfile, fetchProfile } from 'src/features/profile/profileSlice';
import { initializeApp } from 'src/features/appSlice';
import { tokenStorage } from 'src/shared/storage/tokenStorage';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAppInitialized } = useSelector((state: RootState) => state.app);
  const { token } = useSelector((state: RootState) => state.auth);

  const logout = useCallback(() => {
    dispatch(signOut());
    dispatch(clearProfile());
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
    const handleStorageChange = (newValue: string) => {
      if (newValue) {
        getProfile();
      } else {
        logout();
      }
    };

    tokenStorage.subscribe(handleStorageChange);

    return () => {
      tokenStorage.unsubscribe(handleStorageChange);
    };
  }, [getProfile, logout]);

  return <>{children}</>;
};
