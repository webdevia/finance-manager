import React, { CSSProperties } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useGetCategoryList } from 'src/features/category/hooks/useGetCategoryList';
import style from './CategoryListPage.module.scss';
import { CategoryList } from 'src/widgets/CategoryList/CategoryList';
import AddCategoryButton from 'src/features/category/buttons/AddOperationButton/AddOperationButton';

type ColumnsWidthCSS = CSSProperties & {
  '--columns-width': string;
};

type SidebarProps = {
  children?: React.ReactNode;
};

const Sidebar = ({ children }: SidebarProps) => {
  return <div className={style.sidebar}>{children}</div>;
};

export const CategoryListPage: React.FC = () => {
  const navigate = useNavigate();
  const { categories } = useGetCategoryList();

  const handleEditClick = (id: string) => {
    navigate(`${id}/edit`);
  };

  const getContainerStyle = (visible: boolean): ColumnsWidthCSS => ({
    '--columns-width': visible ? '250px 1fr' : '1fr',
  });

  return (
    <div className={style.container} style={getContainerStyle(true)}>
      <Sidebar>
        <AddCategoryButton />
      </Sidebar>
      <div className={style['operation-list']}>
        <CategoryList categories={categories} onEdit={handleEditClick} />
      </div>
      <Outlet />
    </div>
  );
};
