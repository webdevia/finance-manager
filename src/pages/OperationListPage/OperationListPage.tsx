import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { OperationList } from 'src/widgets/OperationList/OperationList';
import AddOperationButton from 'src/features/operation/buttons/AddOperationButton/AddOperationButton';
import { Outlet, useNavigate } from 'react-router-dom';
import { useGetOperationList } from 'src/features/operation/hooks/useGetOperationList';
import AddRandomOperationButton from 'src/features/operation/buttons/AddRandomOperationButton/AddRandomOperationButton';
import { useDeleteOperation } from 'src/features/operation/hooks/useDeleteOperation';
import { Operation } from 'src/entities/operation/operation.types';
import style from './OperationListPage.module.scss';
import { Balance } from 'src/features/balance/ui/Balance';
import { useDispatch, useSelector } from 'react-redux';
import { setLastOperation } from 'src/features/operation/lastOperationSlice';
import { RootState } from 'src/app/store';

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
  const [operationList, setOperationList] = useState<Operation[]>([]);
  const { lastOperation } = useSelector((state: RootState) => state.lastOperation);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pagination } = useGetOperationList({ pageNr: page, onCompleteHandler: addOperationCards });
  const { deleteOperation } = useDeleteOperation();

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
      dispatch(setLastOperation(null));
    }
  }, [lastOperation?.id]);

  const deleteOperationCard = (id: string) => {
    setOperationList((prev) => prev.filter((card) => card.id !== id));
  };

  const addOperationCard = (operation: Operation) => {
    setOperationList((prev) => [...prev, operation]);
  };

  function addOperationCards(data: Operation[]) {
    setOperationList((prev) => [...prev, ...data]);
  }

  const handleEditClick = (id: string) => {
    navigate(`${id}/edit`);
  };

  const handleDeleteClick = (id: string) => {
    deleteOperation(id).then(() => deleteOperationCard(id));
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
            setPage((page) => page + 1);
        }
      });
      node && observer.current.observe(node);
    },
    [pagination?.pageNumber]
  );

  return (
    <div className={style.container} style={getContainerStyle(true)}>
      <Sidebar>
        <AddOperationButton />
        <AddRandomOperationButton onCompleteHandler={addOperationCard} />
        <Balance />
        <div>{`${pagination?.pageNumber} ${pagination?.pageSize} ${pagination?.total}`}</div>
      </Sidebar>
      <div className={style['operation-list']}>
        <OperationList operations={operationList} onEdit={handleEditClick} onDelete={handleDeleteClick} />
        <div ref={lastOperationRef}></div>
      </div>
      <Outlet />
    </div>
  );
};
