import type { Operation } from 'src/shared/api/types/generated.dto.types';
export type { OperationAddInput, OperationUpdateInput } from 'src/shared/api/types/generated.dto.types';
export { OperationType } from 'src/shared/api/types/generated.dto.types';

export type OperationCategoryOption = {
  id: string;
  name: string;
};

export type OperationsQuery = {
  __typename?: 'Query';
  operations: {
    __typename?: 'OperationQueries';
    getMany: {
      __typename?: 'OperationsResponse';
      pagination?: {
        pageNumber: number;
        pageSize: number;
        total: number;
      };
      data?: Operation[] | null;
    };
  };
};

export type OperationQuery = {
  __typename?: 'Query';
  operations: {
    __typename?: 'OperationQueries';
    getOne?: Operation | null;
  };
};

export type AddOperationMutation = {
  __typename?: 'Mutation';
  operations: {
    __typename?: 'OperationMutations';
    add: Operation;
  };
};

export type UpdateOperationMutation = {
  __typename?: 'Mutation';
  operations: {
    __typename?: 'OperationMutations';
    patch: Operation;
  };
};

export { Operation };
