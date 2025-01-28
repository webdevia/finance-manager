import React from 'react';
import cn from 'clsx';
import style from './OperationListPage.module.scss';
import { OperationListProps, OperationListWithButton } from 'src/widgets/OperationList/OperationListWithButton';
import { createRandomOperation } from 'src/entities/operation/Operation';

const initOperations: OperationListProps = {
  operations: [createRandomOperation(new Date().toISOString()), createRandomOperation(new Date().toISOString())],
};

export const OperationListForm: React.FC = () => {
  return <OperationListWithButton {...initOperations} />;
};
