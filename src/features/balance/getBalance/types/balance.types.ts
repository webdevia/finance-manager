import { OperationType } from 'src/entities/operation/types/operation.types';
export { OperationType } from 'src/entities/operation/types/operation.types';

export type BalanceItem = {
  amount: number;
  type: OperationType;
};

export type GetBalanceQuery = {
  __typename?: 'Query';
  operations: {
    __typename?: 'OperationQueries';
    getMany: {
      __typename?: 'OperationsResponse';
      data?: BalanceItem[] | null;
    };
  };
};
