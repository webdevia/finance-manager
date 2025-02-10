import { useQuery } from '@apollo/client';
import { GET_BALANCE } from 'src/entities/operation/api/operation.queries';
import { GetBalanceQuery } from 'src/features/balance/types/balance.types';
import { calcBalance } from 'src/features/balance/lib/balance.lib';

export const useGetBalance = () => {
  const { data, loading, error } = useQuery<GetBalanceQuery>(GET_BALANCE);

  return {
    balance: calcBalance(data?.operations.getMany.data ?? []),
    loading,
    error,
  };
};
