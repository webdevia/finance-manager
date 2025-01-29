import React from 'react';
import cn from 'clsx';
import style from './OperationListPage.module.scss';
import { OperationListProps, OperationList } from 'src/widgets/OperationList/OperationList';
import { createRandomOperation } from 'src/entities/operation/Operation';

const initOperations: OperationListProps = {
  operations: [createRandomOperation(new Date().toISOString()), createRandomOperation(new Date().toISOString())],
};

export const OperationListPage: React.FC = () => {
  return <OperationList {...initOperations} />;
};
