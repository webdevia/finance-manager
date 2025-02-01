import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BankOperation, getRandomId } from 'src/entities/operation/Operation';
import { addOperation, updateOperation } from 'src/features/operation/operationSlice';
import OperationForm, { OnSubmit } from 'src/shared/ui/Forms/OperationForm/OperationForm';
import { OperationSchemaType } from 'src/shared/ui/Forms/OperationForm/operation-schema';
import { normalizeDateString } from 'src/shared/datetime-utils';
import { selectOperations } from 'src/features/operation/selectors';
import Modal from 'src/shared/ui/Modal/Modal';

const OperationDialogPage = () => {
  const [isOperationDialogOpen, setIsOperationDialogOpen] = useState(false);
  const [initialData, setInitialData] = useState<OperationSchemaType>(null);
  const [onSubmit, setOnSubmit] = useState<OnSubmit>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateToOpeartions = () => navigate('/operations');

  const { id } = useParams();
  const location = useLocation();
  const { operations } = useSelector(selectOperations);

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
    navigateToOpeartions();
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
      navigateToOpeartions();
    };

  const isAddRoute = location.pathname.endsWith('/operations/add');

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
    <Modal visible={isOperationDialogOpen} onClose={navigateToOpeartions}>
      <OperationForm onSubmit={onSubmit} initialData={initialData} />
    </Modal>
  );
};

export default OperationDialogPage;
