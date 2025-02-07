import { ApolloError, useMutation } from '@apollo/client';
import { ADD_OPERATION } from 'src/entities/operation/api/operation.mutations';
import { GET_OPERATION_LIST } from 'src/entities/operation/api/operation.queries';
import { OperationAddInput } from 'src/entities/operation/operation.types';
import { ErrorFieldsMap, handleApolloError, handleUnknownError } from 'src/shared/api/errors/errors';

export type OperationErrorableField = 'name';
const errorFieldsMap: ErrorFieldsMap<OperationErrorableField> = {
  VALIDATION: ['name'], // TODO: set correct fields
};

export const useAddOperation = () => {
  const [addOperation, { loading, error }] = useMutation(ADD_OPERATION, {
    refetchQueries: [{ query: GET_OPERATION_LIST }],
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
