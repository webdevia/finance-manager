import { useLazyQuery } from '@apollo/client';
import { GET_CATEGORY } from 'src/entities/category/api/category.queries';
import { CategoryQuery, Category } from 'src/entities/category/category.types';

export const useGetCategory = (id: string) => {
  const [getCategory, { loading, error }] = useLazyQuery<CategoryQuery>(GET_CATEGORY, {
    variables: { getOneId: id },
  });

  const handleGetCategory = async (): Promise<Category | null> => {
    const { data } = await getCategory();
    return data?.categories.getOne ?? null;
  };

  return { getCategory: handleGetCategory, loading, error };
};
