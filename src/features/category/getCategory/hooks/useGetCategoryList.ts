import { useQuery } from '@apollo/client';
import { GET_CATEGORY_LIST } from '../api/getCategory.queries';
import { CategoriesQuery } from 'src/entities/category/types/category.types';

export const useGetCategoryList = () => {
  const { data, loading, error } = useQuery<CategoriesQuery>(GET_CATEGORY_LIST);
  return {
    categories: data?.categories.getMany.data ?? [],
    loading,
    error,
  };
};
