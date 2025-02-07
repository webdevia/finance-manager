import { ApolloError, useMutation } from '@apollo/client';
import { UPDATE_OPERATION } from 'src/entities/operation/api/operation.mutations';
import { GET_OPERATION_LIST } from 'src/entities/operation/api/operation.queries';
import { OperationUpdateInput } from 'src/entities/operation/operation.types';
import { ErrorFieldsMap, handleApolloError, handleUnknownError } from 'src/shared/api/errors/errors';

export type OperationErrorableField = 'name';
const errorFieldsMap: ErrorFieldsMap<OperationErrorableField> = {
  VALIDATION: ['name'], // TODO: set correct fields
};

export const useUpdateOperation = (id: string) => {
  const [updateOperation, { loading, error }] = useMutation(UPDATE_OPERATION, {
    refetchQueries: [{ query: GET_OPERATION_LIST }],
  });

  const handleUpdateOperation = async (updateOperationInputArgs: OperationUpdateInput): Promise<void> => {
    console.log('UPDATE OPERATION');
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
