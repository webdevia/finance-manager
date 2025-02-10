import React from 'react';
import { useGetBalance } from 'src/features/balance/getBalance/hooks/useGetBalance';
import styles from './Balance.module.scss';

export const Balance = () => {
  const { balance } = useGetBalance();

  return <div className={styles.balance}>Balance: {balance.toLocaleString()}</div>;
};
