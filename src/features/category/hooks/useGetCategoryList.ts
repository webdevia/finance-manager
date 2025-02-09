import { useQuery } from '@apollo/client';
import { GET_CATEGORY_LIST } from 'src/entities/category/api/category.queries';
import { CategoriesQuery, Category } from 'src/entities/category/category.types';

type UseGetCategoryList = {
  onCompleteHandler?: (data: Category[]) => void;
};

export const useGetCategoryList = ({ onCompleteHandler }: UseGetCategoryList) => {
  const { data, loading, error } = useQuery<CategoriesQuery>(GET_CATEGORY_LIST, {
    onCompleted(data) {
      onCompleteHandler?.(data?.categories.getMany.data ?? []);
    },
  });
  return {
    categories: data?.categories.getMany.data ?? [],
    loading,
    error,
  };
};
