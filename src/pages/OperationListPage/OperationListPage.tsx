import React, { CSSProperties } from 'react';
import { OperationList } from 'src/widgets/OperationList/OperationList';
import AddOperationButton from 'src/features/AddOperationButton/AddOperationButton';
import { Outlet, useNavigate } from 'react-router-dom';
import style from './OperationListPage.module.scss';
import { useGetOperationList } from 'src/features/operation/hooks/useGetOperationList';

type ColumnsWidthCSS = CSSProperties & {
  '--columns-width': string;
};

const Sidebar = () => {
  return (
    <div className={style.sidebar}>
      <AddOperationButton />
    </div>
  );
};

export const OperationListPage: React.FC = () => {
  const navigate = useNavigate();
  const { operations } = useGetOperationList();

  const onEditClick = (id: string) => {
    navigate(`${id}/edit`);
  };

  const getContainerStyle = (visible: boolean): ColumnsWidthCSS => ({
    '--columns-width': visible ? '250px 1fr' : '1fr',
  });

  return (
    <div className={style.container} style={getContainerStyle(true)}>
      {<Sidebar />}
      <div className={style['operation-list']}>
        <OperationList operations={operations} onEdit={onEditClick} />
      </div>
      <Outlet />
    </div>
  );
};
