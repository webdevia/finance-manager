import React from 'react';
import { OperationCard, OperationCardProps } from '../OperationCard/OperationCard';

import style from './OperationList.module.scss';

export interface OperationListProps {
  operations: OperationCardProps[];
}

export const OperationList: React.FC<OperationListProps> = ({ operations }) => {
  return (
    <div className={style['operation-list']}>
      {operations.map((operation) => (
        <div key={operation.id}>
          <OperationCard {...operation} />
        </div>
      ))}
    </div>
  );
};
