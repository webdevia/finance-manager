import React, { useState } from 'react';
import style from './OperationListWithButton.module.scss';
import { OperationCard } from '../OperationCard/OperationCard';
import { AbstractOperation, createRandomOperation } from 'src/entities/operation/Operation';

export interface OperationListProps {
  operations: AbstractOperation[];
}

export const OperationListWithButton: React.FC<OperationListProps> = ({ operations }) => {
  const [items, setItems] = useState<AbstractOperation[]>(operations);

  return (
    <div>
      {items.map((item) => (
        <div key={item.name}>
          <OperationCard {...item} />
        </div>
      ))}
      <button
        className={style['add-button']}
        onClick={() => setItems([...items, createRandomOperation(new Date().toISOString())])}
      >
        Add
      </button>
    </div>
  );
};
