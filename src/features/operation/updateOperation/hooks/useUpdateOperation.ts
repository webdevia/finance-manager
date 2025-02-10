import { ApolloError, useMutation } from '@apollo/client';
import { UPDATE_OPERATION } from '../api/updateOperation.mutations';
import { GET_BALANCE } from 'src/features/balance/getBalance/api/getBalance.queries';
import { GET_OPERATION_LIST } from 'src/features/operation/getOperation/api/getOperation.query';
import { Operation, OperationUpdateInput, UpdateOperationMutation } from 'src/entities/operation/types/operation.types';
import { ErrorFieldsMap, handleApolloError, handleUnknownError } from 'src/shared/api/errors/errors';

export type OperationErrorableField = 'name';
const errorFieldsMap: ErrorFieldsMap<OperationErrorableField> = {
  VALIDATION: ['name'], // TODO: set correct fields
};

export type UseUpdateOperation = {
  onCompleteHandler?: (data: Operation) => void;
  id: string;
};

export const useUpdateOperation = ({ onCompleteHandler, id }: UseUpdateOperation) => {
  const [updateOperation, { loading, error }] = useMutation<UpdateOperationMutation>(UPDATE_OPERATION, {
    refetchQueries: [{ query: GET_OPERATION_LIST }, { query: GET_BALANCE }],
    onCompleted(data) {
      onCompleteHandler?.(data.operations.patch);
    },
  });

  const handleUpdateOperation = async (updateOperationInputArgs: OperationUpdateInput): Promise<void> => {
    try {
      await updateOperation({ variables: { patchId: id, input: updateOperationInputArgs } });
    } catch (err) {
      if (err instanceof ApolloError) {
        return Promise.reject(handleApolloError(err, errorFieldsMap));
      }
      return Promise.reject(handleUnknownError('An unknown error occurred'));
    }
  };

  return { updateOperation: handleUpdateOperation, loading, error };
};
