import React from 'react';
import cn from 'clsx';
import style from './OperationListPage.module.scss';
import { OperationListProps, OperationList } from 'src/widgets/OperationList/OperationList';
import { createRandomOperation } from 'src/entities/operation/Operation';
import Button from 'src/shared/ui/Button/Button';

const Sidebar = () => <div className={style.sidebar}><Button>Add Cost</Button><Button>Add Profit</Button></div>;

const initOperations: OperationListProps = {
  operations: [
    createRandomOperation(new Date().toISOString()),
    createRandomOperation(new Date().toISOString()),
    createRandomOperation(new Date().toISOString()),
    createRandomOperation(new Date().toISOString()),
    createRandomOperation(new Date().toISOString()),
    createRandomOperation(new Date().toISOString()),
  ],
};

export const OperationListPage: React.FC = () => {
  return (
    <div className={style.container}>
      <Sidebar />
      <div className={style["operation-list"]}><OperationList {...initOperations} /></div>
      
    </div>
  );
};
