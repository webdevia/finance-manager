import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_OPERATION_LIST } from 'src/entities/operation/api/operation.queries';
import { OperationsQuery, Operation } from 'src/entities/operation/operation.types';

export const useGetLazyOperationList = () => {
  const [getOperations, { loading, error }] = useLazyQuery<OperationsQuery>(GET_OPERATION_LIST);

  const handleGetOperations = async (
    pageNr: number
  ): Promise<{
    operations: Operation[];
    pagination?: {
      pageNumber: number;
      pageSize: number;
      total: number;
    };
  }> => {
    const { data } = await getOperations({
      fetchPolicy: 'no-cache',
      variables: {
        input: {
          pagination: {
            pageNumber: pageNr,
          },
        },
      },
    });
    return { operations: data?.operations.getMany.data ?? [], pagination: data?.operations.getMany.pagination };
  };

  return { getLazyOperations: handleGetOperations, loading, error };
};
