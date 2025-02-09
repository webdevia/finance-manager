import { Category } from 'src/shared/api/types/generated.dto.types';
export type { CategoryAddInput, CategoryUpdateInput } from 'src/shared/api/types/generated.dto.types';

export type CategoriesQuery = {
  __typename?: 'Query';
  categories: {
    __typename?: 'CategoryQueries';
    getMany: {
      __typename?: 'CategoriesResponse';
      data?: Category[] | null;
    };
  };
};

export type CategoryQuery = {
  __typename?: 'Query';
  categories: {
    __typename?: 'CategoryQueries';
    getOne?: Category | null;
  };
};

export type AddCategoryMutation = {
  __typename?: 'Mutation';
  categories: {
    __typename?: 'CategoryMutations';
    add: Category;
  };
};

export type RemoveCategoryMutation = {
  __typename?: 'Mutation';
  categories: {
    __typename?: 'CategoryMutations';
    remove: Category;
  };
};

export type UpdateCategoryMutation = {
  __typename?: 'Mutation';
  categories: {
    __typename?: 'CategoryMutations';
    patch: Category;
  };
};

export { Category };
