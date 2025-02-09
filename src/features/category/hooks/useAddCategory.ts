import { ApolloError, useMutation } from '@apollo/client';
import { ADD_CATEGORY } from 'src/entities/category/api/category.mutations';
import { GET_CATEGORY_LIST } from 'src/entities/category/api/category.queries';
import { AddCategoryMutation, Category, CategoryAddInput } from 'src/entities/category/category.types';
import { ErrorFieldsMap, handleApolloError, handleUnknownError } from 'src/shared/api/errors/errors';

export type CategoryErrorableField = 'name';
const errorFieldsMap: ErrorFieldsMap<CategoryErrorableField> = {
  VALIDATION: ['name'], // TODO: set correct fields
};

export type UseAddCategory = {
  onCompleteHandler?: (data: Category) => void;
};

export const useAddCategory = ({ onCompleteHandler }: UseAddCategory) => {
  const [addCategory, { loading, error }] = useMutation<AddCategoryMutation>(ADD_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORY_LIST }],
    onCompleted(data) {
      onCompleteHandler?.(data.categories.add);
    },
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
