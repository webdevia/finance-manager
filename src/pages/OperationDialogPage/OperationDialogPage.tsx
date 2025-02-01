import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BankOperation, getRandomId } from 'src/entities/operation/Operation';
import { addOperation } from 'src/features/operationSlice';
import { OnSubmit } from 'src/shared/ui/Forms/OperationForm/OperationForm';
import { updateOperation } from 'src/features/operationSlice';
import OperationDialog from 'src/widgets/Dialogs/OperationDialog/OperationDialog';
import { RootState } from 'src/app/store';
import { OperationSchemaType } from 'src/shared/ui/Forms/OperationForm/operation-schema';
import { normalizeDateString } from 'src/shared/datetime-utils';

const OperationDialogPage = () => {
  const [isOperationDialogOpen, setIsOperationDialogOpen] = useState(false);
  const [initialData, setInitialData] = useState<OperationSchemaType>(null);
  const [onSubmit, setOnSubmit] = useState<OnSubmit>(null);
  const { id } = useParams();
  const location = useLocation();
  const isAddRoute = location.pathname.endsWith('/operations/add');

  const { operations } = useSelector((state: RootState) => state.operations);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddOperation: OnSubmit = (data) => {
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

  const handleUpdateOperation =
    (id: string): OnSubmit =>
    (data) => {
      const updatedOperation: BankOperation = {
        id,
        amount: data.amount,
        category: { id: getRandomId(), name: data.name },
        date: data.createdAt,
        name: data.name,
        description: data.desc,
        type: data.type,
      };
      dispatch(updateOperation(updatedOperation));
      navigate('/operations');
    };

  useEffect(() => {
    if (isAddRoute || id) {
      if (id && id !== 'add') {
        const operationToEdit = operations.find((op) => op.id === id);
        const initialFormData: OperationSchemaType = operationToEdit
          ? {
              amount: operationToEdit.amount,
              category: operationToEdit.category.name,
              createdAt: normalizeDateString(operationToEdit.date),
              name: operationToEdit.name,
              desc: operationToEdit.description,
              type: operationToEdit.type,
            }
          : null;
        setInitialData(initialFormData);
        setOnSubmit(() => handleUpdateOperation(id));
      } else {
        setOnSubmit(() => handleAddOperation);
      }
      setIsOperationDialogOpen(true);
    } else {
      setIsOperationDialogOpen(false);
    }
  }, [id, isAddRoute]);

  return (
    <OperationDialog
      visible={isOperationDialogOpen}
      onClose={() => navigate('/operations')}
      onSubmit={onSubmit}
      initialData={initialData}
    />
  );
};

export default OperationDialogPage;
