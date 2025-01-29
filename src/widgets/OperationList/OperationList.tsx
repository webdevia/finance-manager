import React from 'react';
import { OperationCard } from '../OperationCard/OperationCard';
import { AbstractOperation } from 'src/entities/operation/Operation';
import style from './OperationList.module.scss';

export interface OperationListProps {
  operations: AbstractOperation[];
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
