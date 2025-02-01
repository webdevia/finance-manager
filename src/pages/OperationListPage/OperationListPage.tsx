import React from 'react';
import style from './OperationListPage.module.scss';
import { OperationList } from 'src/widgets/OperationList/OperationList';
import { createRandomOperation } from 'src/entities/operation/Operation';
import AddOperationButton from 'src/features/AddOperationButton/AddOperationButton';
import { Outlet, useNavigate } from 'react-router-dom';
import Button from 'src/shared/ui/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { addOperation } from 'src/features/operationSlice';
import { RootState } from 'src/app/store';
import { selectIsAdmin } from 'src/features/profile/selectors';

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleAddRandomOperation = () => {
    const newOperation = createRandomOperation(new Date().toISOString());
    dispatch(addOperation(newOperation));
  };

  const handleAdd100 = () => {
    [...Array(100)].forEach(() => handleAddRandomOperation());
  };

  return (
    <div className={style.sidebar}>
      <AddOperationButton />
      <Button onClick={handleAddRandomOperation}>Add random operation</Button>
      <Button onClick={handleAdd100}>Add 100 operations</Button>
    </div>
  );
};

export const OperationListPage: React.FC = () => {
  const navigate = useNavigate();
  const { operations } = useSelector((state: RootState) => state.operations);
  const isAdmin = useSelector(selectIsAdmin);

  const onEditClick = (id: string) => {
    navigate(`${id}/edit`);
  };

  return (
    <div className={style.container}>
      <Sidebar />
      <div className={style['operation-list']}>
        <OperationList operations={operations} onEdit={isAdmin && onEditClick} />
      </div>
      <Outlet />
    </div>
  );
};
