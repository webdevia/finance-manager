import React, { ReactNode, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';

import { fakeProfile } from 'src/shared/services/authService';
import { clearToken, setToken } from 'src/features/auth/authSlice';
import { clearProfile, setProfile } from 'src/features/profile/profileSlice';
import { initializeApp } from 'src/features/appSlice';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAppInitialized } = useSelector((state: RootState) => state.app);

  const logout = useCallback(() => {
    dispatch(clearToken());
    dispatch(clearProfile());
  }, [dispatch]);

  const login = useCallback(
    async (token: string) => {
      try {
        const data = await fakeProfile(token);
        if (data) {
          dispatch(setToken(data.token));
          dispatch(setProfile(data));
        }
      } catch (error) {
        logout();
      }
    },
    [dispatch, logout]
  );

  useEffect(() => {
    if (!isAppInitialized) {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        fakeProfile(storedToken)
          .then((data) => {
            if (data) {
              dispatch(setToken(data.token));
              dispatch(setProfile(data));
            }
          })
          .catch(logout);
      }

      dispatch(initializeApp());
    }
  }, [dispatch, logout, isAppInitialized]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'token') {
        const newToken = event.newValue;
        if (newToken) {
          login(newToken);
        } else {
          logout();
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [login, logout]);

  return <>{children}</>;
};
