import React from 'react';
import { Provider } from 'react-redux';
import { type Store } from 'redux';

interface StoreProviderProps {
  children: React.ReactNode;
  store: Store;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children, store }) => {
  return <Provider store={store}>{children}</Provider>;
};
