import { ApolloError, useMutation } from '@apollo/client';
import { ADD_OPERATION } from 'src/entities/operation/api/operation.mutations';
import { GET_OPERATION_LIST, GET_BALANCE } from 'src/entities/operation/api/operation.queries';
import { AddOperationMutation, Operation, OperationAddInput } from 'src/entities/operation/operation.types';
import { ErrorFieldsMap, handleApolloError, handleUnknownError } from 'src/shared/api/errors/errors';

export type OperationErrorableField = 'name';
const errorFieldsMap: ErrorFieldsMap<OperationErrorableField> = {
  VALIDATION: ['name'], // TODO: set correct fields
};

export type UseAddOperation = {
  onCompleteHandler?: (data: Operation) => void;
};

export const useAddOperation = ({ onCompleteHandler }: UseAddOperation) => {
  const [addOperation, { loading, error }] = useMutation<AddOperationMutation>(ADD_OPERATION, {
    refetchQueries: [{ query: GET_OPERATION_LIST }, { query: GET_BALANCE }],
    onCompleted(data) {
      onCompleteHandler?.(data.operations.add);
    },
  });

  const handleAddOperation = async (addOperationInputArgs: OperationAddInput): Promise<void> => {
    try {
      await addOperation({ variables: { input: addOperationInputArgs } });
    } catch (err) {
      if (err instanceof ApolloError) {
        return Promise.reject(handleApolloError(err, errorFieldsMap));
      }
      return Promise.reject(handleUnknownError('An unknown error occurred'));
    }
  };

  return { addOperation: handleAddOperation, loading, error };
};
