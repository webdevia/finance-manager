import React, { useState } from 'react';
import style from './OperationCard.module.scss';
import cn from 'clsx';
import { Operation } from 'src/entities/operation/operation.types';
import LeftRightLayout from 'src/shared/ui/Layouts/LeftRightLayout/LeftRightLayout';
import Button from 'src/shared/ui/Button/Button';
import { normalizeDateString } from 'src/shared/utils/datetimeUtils';

export type OperationCardProps = Operation & {
  onEditClick?: (id: string) => void;
  onDeleteClick?: (id: string) => Promise<void>;
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
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = () => {
    if (onDeleteClick) {
      setIsDeleting(true);
      onDeleteClick(id).finally(() => setIsDeleting(false));
    }
  };

  return (
    <div className={cn(style['card'], { [style.cost]: type === 'Cost' }, { [style.profit]: type === 'Profit' })}>
      {category.photo && (
        <div className={style['card-image']}>
          <img src={category.photo} alt={name} className={style['image']} />
        </div>
      )}
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
        left={<span className={style['date']}>{normalizeDateString(date)}</span>}
        right={
          <>
            {onEditClick && (
              <Button disabled={isDeleting} small onClick={() => onEditClick(id)}>
                Edit
              </Button>
            )}
            {onDeleteClick && (
              <Button disabled={isDeleting} small onClick={handleDeleteClick}>
                Delete
              </Button>
            )}
          </>
        }
      />
    </div>
  );
};
