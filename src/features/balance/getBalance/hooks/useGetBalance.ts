import { useQuery } from '@apollo/client';
import { GET_BALANCE } from '../api/getBalance.queries';
import { GetBalanceQuery } from '../types/balance.types';
import { calcBalance } from 'src/features/balance/getBalance/lib/balance.lib';

export const useGetBalance = () => {
  const { data, loading, error } = useQuery<GetBalanceQuery>(GET_BALANCE);

  return {
    balance: calcBalance(data?.operations.getMany.data ?? []),
    loading,
    error,
  };
};
