import React from 'react';
import style from './OperationListPage.module.scss';
import { OperationListProps, OperationList } from 'src/widgets/OperationList/OperationList';
import { createRandomOperation } from 'src/entities/operation/Operation';
import AddOperationButton from 'src/features/AddOperationButton/AddOperationButton';
import { Outlet, useNavigate } from 'react-router-dom';

const Sidebar = () => (
  <div className={style.sidebar}>
    <AddOperationButton />
  </div>
);

const initOperations = (onEditClick: (id: string) => void): OperationListProps => ({
  operations: [
    { ...createRandomOperation(new Date().toISOString()), onEditClick },
    { ...createRandomOperation(new Date().toISOString()), onEditClick },
    { ...createRandomOperation(new Date().toISOString()), onEditClick },
    { ...createRandomOperation(new Date().toISOString()), onEditClick },
    { ...createRandomOperation(new Date().toISOString()), onEditClick },
    { ...createRandomOperation(new Date().toISOString()), onEditClick },
    { ...createRandomOperation(new Date().toISOString()), onEditClick },
    { ...createRandomOperation(new Date().toISOString()), onEditClick },
    { ...createRandomOperation(new Date().toISOString()), onEditClick },
  ],
});

export const OperationListPage: React.FC = () => {
  const navigate = useNavigate();

  const onEditClick = (id: string) => {
    navigate(`${id}/edit`);
  };
  return (
    <div className={style.container}>
      <Sidebar />
      <div className={style['operation-list']}>
        <OperationList {...initOperations(onEditClick)} />
      </div>
      <Outlet />
    </div>
  );
};
