import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BankOperation, getRandomId } from 'src/entities/operation/Operation';
import { addOperation } from 'src/features/operationSlice';
import { OnSubmit } from 'src/shared/ui/Forms/OperationForm/OperationForm';

import OperationDialog from 'src/widgets/Dialogs/OperationDialog/OperationDialog';

const OperationDialogPage = () => {
  const [isOperationDialogOpen, setIsOperationDialogOpen] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const isAddRoute = location.pathname.endsWith('/operations/add');
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onSubmit: OnSubmit = (data) => {
    const newOperation: BankOperation = {
      id: getRandomId(),
      amount: data.amount,
      category: { id: getRandomId(), name: data.name },
      date: data.createdAt,
      name: data.name,
      description: data.desc,
      type: data.type,
    };
    dispatch(addOperation(newOperation));
    navigate('/operations');
  };

  useEffect(() => {
    if (isAddRoute || id) {
      setIsOperationDialogOpen(true);
      //   if (id && id !== 'add') {
      //     const operationToEdit = operations.find((op) => op.id === id);
      //     setEditingOperation(operationToEdit || null);
      //   } else {
      //     setEditingOperation(null);
      //   }
    } else {
      setIsOperationDialogOpen(false);
    }
  }, [id, isAddRoute]);

  return (
    <OperationDialog visible={isOperationDialogOpen} onClose={() => navigate('/operations')} onSubmit={onSubmit} />
  );
};

export default OperationDialogPage;
