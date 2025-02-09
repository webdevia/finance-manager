import React from 'react';
import { useGetBalance } from 'src/features/balance/hooks/useGetBalance';

export const Balance = () => {
  const { balance } = useGetBalance();

  return <div>Balance: {balance} RUB</div>;
};
