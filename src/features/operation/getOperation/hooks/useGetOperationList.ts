import { useQuery } from '@apollo/client';
import { GET_OPERATION_LIST } from '../api/getOperation.query';
import { OperationsQuery, Operation } from 'src/entities/operation/types/operation.types';

type UseGetOperationList = {
  pageNr: number;
  onCompleteHandler?: (data: Operation[]) => void;
};

export const useGetOperationList = ({ pageNr, onCompleteHandler }: UseGetOperationList) => {
  const { data, loading, error } = useQuery<OperationsQuery>(GET_OPERATION_LIST, {
    onCompleted(data) {
      onCompleteHandler?.(data?.operations.getMany.data ?? []);
    },
    variables: {
      input: {
        pagination: {
          pageNumber: pageNr,
        },
      },
    },
  });
  return {
    operations: data?.operations.getMany.data ?? [],
    pagination: data?.operations.getMany.pagination,
    loading,
    error,
  };
};
