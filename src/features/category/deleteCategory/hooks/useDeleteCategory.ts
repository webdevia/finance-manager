import { ApolloError, useMutation } from '@apollo/client';
import { REMOVE_CATEGORY } from 'src/entities/category/api/category.mutations';
import { GET_CATEGORY_LIST } from 'src/entities/category/api/category.queries';
import { ErrorFieldsMap, handleApolloError, handleUnknownError } from 'src/shared/api/errors/errors';

export type CategoryErrorableField = 'name';
const errorFieldsMap: ErrorFieldsMap<CategoryErrorableField> = {
  VALIDATION: ['name'], // TODO: set correct fields
};

export const useDeleteCategory = () => {
  const [deleteCategory, { loading, error }] = useMutation(REMOVE_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORY_LIST }],
  });

  const handleDeleteCategory = async (id: string): Promise<void> => {
    try {
      await deleteCategory({ variables: { removeId: id } });
    } catch (err) {
      if (err instanceof ApolloError) {
        return Promise.reject(handleApolloError(err, errorFieldsMap));
      }
      return Promise.reject(handleUnknownError('An unknown error occurred'));
    }
  };

  return { deleteCategory: handleDeleteCategory, loading, error };
};
