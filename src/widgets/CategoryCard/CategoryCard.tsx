import React from 'react';
import cn from 'clsx';
import { Category } from 'src/entities/category/category.types';
import LeftRightLayout from 'src/shared/ui/Layouts/LeftRightLayout/LeftRightLayout';
import Button from 'src/shared/ui/Button/Button';
import style from './CetegoryCard.module.scss';

export type CategoryCardProps = Category & {
  onEditClick?: (id: string) => void;
  onDeleteClick?: (id: string) => void;
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, photo, onEditClick, onDeleteClick }) => {
  return (
    <div className={cn(style['card'])}>
      <div className={style['card-header']}>
        <span className={style['category']}></span>
        <span className={style['money-value']}></span>
      </div>
      <div className={style['card-body']}>
        <h2 className={style['name']}>{name}</h2>
        <p className={style['description']}></p>
      </div>
      <LeftRightLayout
        elementsGap="0.5rem"
        left={<span className={style['date']}></span>}
        right={
          onEditClick && (
            <Button small onClick={() => onEditClick(id)}>
              Edit
            </Button>
          )
        }
      />
    </div>
  );
};
