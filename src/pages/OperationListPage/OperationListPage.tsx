import React, { CSSProperties, useCallback, useRef, useState } from 'react';
import { OperationList } from 'src/widgets/OperationList/OperationList';
import AddOperationButton from 'src/features/operation/buttons/AddOperationButton/AddOperationButton';
import { Outlet, useNavigate } from 'react-router-dom';
import { useGetOperationList } from 'src/features/operation/hooks/useGetOperationList';
import AddRandomOperationButton from 'src/features/operation/buttons/AddRandomOperationButton/AddRandomOperationButton';
import { useDeleteOperation } from 'src/features/operation/hooks/useDeleteOperation';
import { Operation } from 'src/entities/operation/operation.types';
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
  const [operationList, setOperationList] = useState<Operation[]>([]);
  const navigate = useNavigate();
  const { pagination } = useGetOperationList({ pageNr: page, onCompleteHandler: onSuccessLoad });
  const { deleteOperation } = useDeleteOperation();

  function onSuccessLoad(data: Operation[]) {
    setOperationList((prev) => [...prev, ...data]);
  }

  const handleEditClick = (id: string) => {
    navigate(`${id}/edit`);
  };

  const handleDeleteClick = (id: string) => {
    deleteOperation(id);
  };

  const getContainerStyle = (visible: boolean): ColumnsWidthCSS => ({
    '--columns-width': visible ? '250px 1fr' : '1fr',
  });

  const observer = useRef<IntersectionObserver | null>(null);

  const lastOperationRef = useCallback((node: HTMLDivElement) => {
    observer.current && observer.current.disconnect();
    observer.current = new IntersectionObserver((items) => items[0].isIntersecting && setPage((page) => page + 1));
    node && observer.current.observe(node);
  }, []);

  // PageNr + 1 when habdler intersection observer load new while (PageNr * PageSize < Total) {load pageNr + 1} else {};

  return (
    <div className={style.container} style={getContainerStyle(true)}>
      <Sidebar>
        <AddOperationButton />
        <AddRandomOperationButton />
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
