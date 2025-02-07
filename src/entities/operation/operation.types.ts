import type { Operation } from 'src/shared/api/types/generated.dto.types';
export { OperationAddInput, OperationUpdateInput, OperationType } from 'src/shared/api/types/generated.dto.types';
export type OperationsQuery = {
  __typename?: 'Query';
  operations: {
    __typename?: 'OperationQueries';
    getMany: {
      __typename?: 'OperationsResponse';
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

export { Operation };
