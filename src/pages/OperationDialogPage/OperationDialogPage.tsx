import React, { useCallback, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import OperationForm, { OnSubmit } from 'src/shared/ui/Forms/OperationForm/OperationForm';
import Modal from 'src/shared/ui/Modal/Modal';
import { useAddOperation } from 'src/features/operation/hooks/useAddOperation';
import { OperationAddInput, OperationType, OperationUpdateInput } from 'src/entities/operation/operation.types';
import { useGetOperation } from 'src/features/operation/hooks/useGetOperation';
import { OperationSchemaType } from 'src/shared/ui/Forms/OperationForm/operation-schema';
import { useUpdateOperation } from 'src/features/operation/hooks/useUpdateOperation';

const OperationDialogPage = () => {
  const [isOperationDialogOpen, setIsOperationDialogOpen] = useState(false);
  const [onSubmit, setOnSubmit] = useState<OnSubmit>(() => {});
  const [initialData, setInitialData] = useState<OperationSchemaType | null>(null);

  const { addOperation, loading } = useAddOperation();
  const navigate = useNavigate();
  const navigateToOpeartions = useCallback(() => navigate('/operations'), [navigate]);
  const { id } = useParams();

  if (!id) {
    return <Navigate to={'/operations/add'} />;
  }

  const { getOperation } = useGetOperation(id);
  const { updateOperation } = useUpdateOperation(id);
  const location = useLocation();

  // TODO: set real data
  const handleAddOperation: OnSubmit = useCallback(
    (data) => {
      const newOperation: OperationAddInput = {
        amount: data.amount,
        categoryId: '67a28da3959ec5e015c2636a',
        date: data.date,
        name: data.name,
        type: data.type as OperationType,
      };
      addOperation(newOperation).then(() => navigateToOpeartions());
    },
    [navigateToOpeartions]
  );

  const handleUpdateOperation = useCallback<OnSubmit>(
    (data) => {
      const updatedOperation: OperationUpdateInput = {
        amount: data.amount,
        categoryId: '67a28da3959ec5e015c2636a',
        date: data.date,
        name: data.name,
        desc: data.desc,
        type: data.type as OperationType,
      };
      updateOperation(updatedOperation).then(() => navigateToOpeartions());
    },
    [navigateToOpeartions]
  );

  const isAddRoute = location.pathname.endsWith('/operations/add');

  useEffect(() => {
    (async () => {
      if (isAddRoute || id) {
        if (id && id !== 'add') {
          // TODO: handle error
          const operationToEdit = await getOperation();
          if (operationToEdit) {
            const initialFormData: OperationSchemaType = {
              amount: operationToEdit.amount,
              category: operationToEdit.category.name,
              date: operationToEdit.date,
              name: operationToEdit.name,
              desc: operationToEdit.desc ?? '',
              type: operationToEdit.type as OperationType,
            };
            setInitialData(initialFormData);
          } else {
            throw new Error(`Cannot find operation with ID ${id}`);
            navigate('/operations/add');
          }
          setOnSubmit(() => handleUpdateOperation);
        } else {
          setOnSubmit(() => handleAddOperation);
        }
        setIsOperationDialogOpen(true);
      } else {
        setIsOperationDialogOpen(false);
      }
    })();
  }, [id, isAddRoute, handleAddOperation]);

  return (
    <Modal visible={isOperationDialogOpen} onClose={navigateToOpeartions}>
      <OperationForm onSubmit={onSubmit} initialData={initialData} />
    </Modal>
  );
};

export default OperationDialogPage;
