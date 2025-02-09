import React from 'react';
import cn from 'clsx';
import { Category } from 'src/entities/category/category.types';
import LeftRightLayout from 'src/shared/ui/Layouts/LeftRightLayout/LeftRightLayout';
import Button from 'src/shared/ui/Button/Button';
import style from './CetegoryCard.module.scss';

export type CategoryCardProps = Category & {
  onEditClick?: (id: string) => void;
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, photo, onEditClick }) => {
  return (
    <div className={cn(style['card'])}>
      {photo && (
        <div className={style['card-image']}>
          <img src={photo} alt={name} className={style['image']} />
        </div>
      )}
      <div className={style['card-body']}>
        <h2 className={style['name']}>{name}</h2>
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
