import { ApolloError, useMutation } from '@apollo/client';
import { UPDATE_CATEGORY } from '../api/updateCategory.mutations';
import { GET_CATEGORY_LIST } from 'src/features/category/getCategory/api/getCategory.queries';
import { Category, CategoryUpdateInput, UpdateCategoryMutation } from 'src/entities/category/types/category.types';
import { ErrorFieldsMap, handleApolloError, handleUnknownError } from 'src/shared/api/errors/errors';

export type CategoryErrorableField = 'name';
const errorFieldsMap: ErrorFieldsMap<CategoryErrorableField> = {
  VALIDATION: ['name'], // TODO: set correct fields
};

export type UseUpdateCategory = {
  onCompleteHandler?: (data: Category) => void;
  id: string;
};

export const useUpdateCategory = ({ onCompleteHandler, id }: UseUpdateCategory) => {
  const [updateCategory, { loading, error }] = useMutation<UpdateCategoryMutation>(UPDATE_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORY_LIST }],
    onCompleted(data) {
      onCompleteHandler?.(data.categories.patch);
    },
  });

  const handleUpdateCategory = async (updateCategoryInputArgs: CategoryUpdateInput): Promise<void> => {
    try {
      await updateCategory({ variables: { patchId: id, input: updateCategoryInputArgs } });
    } catch (err) {
      if (err instanceof ApolloError) {
        return Promise.reject(handleApolloError(err, errorFieldsMap));
      }
      return Promise.reject(handleUnknownError('An unknown error occurred'));
    }
  };

  return { updateCategory: handleUpdateCategory, loading, error };
};
