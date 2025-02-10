import { ApolloError, useMutation } from '@apollo/client';
import { ADD_CATEGORY } from '../api/addCategory.mutations';
import { GET_CATEGORY_LIST } from 'src/features/category/getCategory/api/getCategory.queries';
import { AddCategoryMutation, CategoryAddInput } from 'src/entities/category/types/category.types';
import { ErrorFieldsMap, handleApolloError, handleUnknownError } from 'src/shared/api/errors/errors';

export type CategoryErrorableField = 'name';
const errorFieldsMap: ErrorFieldsMap<CategoryErrorableField> = {
  VALIDATION: ['name'], // TODO: set correct fields
};

export const useAddCategory = () => {
  const [addCategory, { loading, error }] = useMutation<AddCategoryMutation>(ADD_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORY_LIST }],
  });

  const handleAddCategory = async (addCategoryInputArgs: CategoryAddInput): Promise<void> => {
    try {
      await addCategory({ variables: { input: addCategoryInputArgs } });
    } catch (err) {
      if (err instanceof ApolloError) {
        return Promise.reject(handleApolloError(err, errorFieldsMap));
      }
      return Promise.reject(handleUnknownError('An unknown error occurred'));
    }
  };

  return { addCategory: handleAddCategory, loading, error };
};
