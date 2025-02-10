import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { OperationList } from 'src/widgets/OperationList/OperationList';
import { AddOperationButton } from 'src/features/operation/addOperation/ui/AddOperationButton';
import { Outlet, useNavigate } from 'react-router-dom';
import { useGetOperationList } from 'src/features/operation/getOperation/hooks/useGetOperationList';
import { AddRandomOperationButton } from 'src/features/operation/addOperation/ui/AddRandomOperationButton';
import { useDeleteOperation } from 'src/features/operation/deleteOperation/hooks/useDeleteOperation';
import { Operation } from 'src/entities/operation/types/operation.types';
import { Balance } from 'src/features/balance/getBalance/ui/Balance/Balance';
import { useDispatch, useSelector } from 'react-redux';
import { setUpdatedOperation } from 'src/features/operation/updateOperation/slices/updatedOperationSlice';
import { RootState } from 'src/app/store';
import { useGetLazyOperationList } from 'src/features/operation/getOperation/hooks/useGetLazyOperationList';
import style from './OperationListPage.module.scss';

type ColumnsWidthCSS = CSSProperties & {
  '--columns-width': string;
};

type SidebarProps = {
  children?: React.ReactNode;
};

const Sidebar = ({ children }: SidebarProps) => {
  return <div className={style.sidebar}>{children}</div>;
};

export const OperationListPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [operationList, setOperationList] = useState<Operation[]>(() => []);
  const { updatedOperation: lastOperation } = useSelector((state: RootState) => state.updatedOperation);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { operations, pagination, loading } = useGetOperationList({
    pageNr: page,
  });
  const { getLazyOperations, loading: lazyLoading } = useGetLazyOperationList();
  const { deleteOperation } = useDeleteOperation();

  function addOperationCards(data: Operation[]) {
    setOperationList((prev) => [...prev, ...data.filter((dataEl) => !prev.some((prevEl) => prevEl.id === dataEl.id))]);
  }

  useEffect(() => {
    if (operations.length > 0) {
      addOperationCards(operations);
    }
  }, [operations]);

  useEffect(() => {
    if (lastOperation?.id) {
      setOperationList((prev) => {
        const index = prev.findIndex((item) => item.id === lastOperation.id);
        const newOperationList = [...prev];
        const replaceOperation = () => {
          newOperationList.splice(index, 1, lastOperation);
          return newOperationList;
        };
        const addOperation = () => {
          newOperationList.push(lastOperation);
          return newOperationList;
        };
        return index > -1 ? replaceOperation() : addOperation();
      });
      dispatch(setUpdatedOperation(null));
    }
  }, [lastOperation, dispatch]);

  const deleteOperationCard = (id: string) => {
    setOperationList((prev) => prev.filter((card) => card.id !== id));
  };

  const addOperationCard = (operation: Operation) => {
    setOperationList((prev) => [...prev, operation]);
  };

  const handleEditClick = (id: string) => {
    navigate(`${id}/edit`);
  };

  const handleDeleteClick = (id: string) => {
    return deleteOperation(id)
      .then(() => deleteOperationCard(id))
      .then(() => getLazyOperations(page))
      .then(({ operations }) => {
        addOperationCards(operations);
      });
  };

  const getContainerStyle = (visible: boolean): ColumnsWidthCSS => ({
    '--columns-width': visible ? '250px 1fr' : '1fr',
  });

  const observer = useRef<IntersectionObserver | null>(null);

  const lastOperationRef = useCallback(
    (node: HTMLDivElement) => {
      observer.current && observer.current.disconnect();
      observer.current = new IntersectionObserver((items) => {
        if (pagination) {
          items[0].isIntersecting &&
            pagination.pageNumber * pagination.pageSize < pagination.total &&
            setPage((prev) => prev + 1);
        }
      });
      node && observer.current.observe(node);
    },
    [pagination]
  );

  return (
    <div className={style.container} style={getContainerStyle(true)}>
      <Sidebar>
        <AddOperationButton />
        <AddRandomOperationButton onCompleteHandler={addOperationCard} />
        <Balance />
      </Sidebar>
      <div className={style['operation-list']}>
        <OperationList operations={operationList} onEdit={handleEditClick} onDelete={handleDeleteClick} />
        <div ref={lastOperationRef}>{(loading || lazyLoading) && 'LOADING...'}</div>
      </div>
      <Outlet />
    </div>
  );
};
