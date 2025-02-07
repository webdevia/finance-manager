import { useQuery } from '@apollo/client';
import { GET_OPERATION_LIST } from 'src/entities/operation/api/operation.queries';
import { OperationsQuery } from 'src/entities/operation/operation.types';

export const useGetOperationList = () => {
  const { data, loading, error } = useQuery<OperationsQuery>(GET_OPERATION_LIST);
  console.log('GET OPERATION LIST');
  return { operations: data?.operations.getMany.data ?? [], loading, error };
};
