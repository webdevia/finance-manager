import React from 'react';
import style from './OperationCard.module.scss';
import cn from 'clsx';
import { Operation } from 'src/entities/operation/operation.types';
import LeftRightLayout from 'src/shared/ui/Layouts/LeftRightLayout/LeftRightLayout';
import Button from 'src/shared/ui/Button/Button';

export type OperationCardProps = Operation & {
  onEditClick?: (id: string) => void;
  onDeleteClick?: (id: string) => void;
};

export const OperationCard: React.FC<OperationCardProps> = ({
  id,
  amount,
  category,
  name,
  desc,
  date,
  type,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <div className={cn(style['card'], { [style.cost]: type === 'Cost' }, { [style.profit]: type === 'Profit' })}>
      <div className={style['card-header']}>
        <span className={style['category']}>{category.name}</span>
        <span className={style['money-value']}>{amount}</span>
      </div>
      <div className={style['card-body']}>
        <h2 className={style['name']}>{name}</h2>
        <p className={style['description']}>{desc}</p>
      </div>
      <LeftRightLayout
        elementsGap="0.5rem"
        left={<span className={style['date']}>{date}</span>}
        right={
          <>
            {onEditClick && (
              <Button small onClick={() => onEditClick(id)}>
                Edit
              </Button>
            )}
            {onDeleteClick && (
              <Button small onClick={() => onDeleteClick(id)}>
                Delete
              </Button>
            )}
          </>
        }
      />
    </div>
  );
};
