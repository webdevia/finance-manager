import { ApolloError, useMutation } from '@apollo/client';
import { REMOVE_OPERATION } from 'src/entities/operation/api/operation.mutations';
import { GET_BALANCE } from 'src/entities/operation/api/operation.queries';
import { ErrorFieldsMap, handleApolloError, handleUnknownError } from 'src/shared/api/errors/errors';

export type OperationErrorableField = 'name';
const errorFieldsMap: ErrorFieldsMap<OperationErrorableField> = {
  VALIDATION: ['name'], // TODO: set correct fields
};

export const useDeleteOperation = () => {
  const [deleteOperation, { loading, error }] = useMutation(REMOVE_OPERATION, {
    refetchQueries: [{ query: GET_BALANCE }],
  });

  const handleDeleteOperation = async (id: string): Promise<void> => {
    try {
      await deleteOperation({ variables: { removeId: id } });
    } catch (err) {
      if (err instanceof ApolloError) {
        return Promise.reject(handleApolloError(err, errorFieldsMap));
      }
      return Promise.reject(handleUnknownError('An unknown error occurred'));
    }
  };

  return { deleteOperation: handleDeleteOperation, loading, error };
};
