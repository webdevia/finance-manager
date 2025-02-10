import { useLazyQuery } from '@apollo/client';
import { GET_OPERATION } from '../api/getOperation.query';
import { OperationQuery, Operation } from 'src/entities/operation/types/operation.types';

export const useGetOperation = (id: string) => {
  const [getOperation, { loading, error }] = useLazyQuery<OperationQuery>(GET_OPERATION, {
    variables: { getOneId: id },
  });

  const handleGetOperation = async (): Promise<Operation | null> => {
    const { data } = await getOperation();
    const operation = data?.operations.getOne ?? null;
    return operation;
  };

  return { getOperation: handleGetOperation, loading, error };
};
