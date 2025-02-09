import React, { useCallback, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import OperationForm, { OnSubmit } from 'src/features/operation/form/ui/OperationForm/OperationForm';
import Modal from 'src/shared/ui/Modal/Modal';
import { useAddOperation } from 'src/features/operation/hooks/useAddOperation';
import { OperationAddInput, OperationUpdateInput } from 'src/entities/operation/operation.types';
import { useGetOperation } from 'src/features/operation/hooks/useGetOperation';
import { OperationSchemaType } from 'src/features/operation/form/operationForm.schema';
import { useUpdateOperation } from 'src/features/operation/hooks/useUpdateOperation';
import {
  transformFormDataToOpearionInput,
  transformOperationToFormData,
} from 'src/features/operation/form/operationForm.lib';

import { setLastOperation } from 'src/features/operation/lastOperationSlice';
import { useDispatch } from 'react-redux';
import { useGetCategoryList } from 'src/features/category/hooks/useGetCategoryList';

const OperationDialogPage = () => {
  const [isOperationDialogOpen, setIsOperationDialogOpen] = useState(false);
  const [onSubmit, setOnSubmit] = useState<OnSubmit>(() => {});
  const [initialData, setInitialData] = useState<OperationSchemaType | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateToOpeartions = useCallback(() => navigate('/operations'), [navigate]);
  const location = useLocation();
  const { id } = useParams();
  const hasAddRoute = location.pathname.endsWith('/operations/add');
  const canBeProcessed = id || hasAddRoute;

  if (!canBeProcessed) {
    return <Navigate to={'/operations'} />;
  }

  const operationId = id ?? '';

  const { addOperation } = useAddOperation({
    onCompleteHandler: (data) => dispatch(setLastOperation(data)),
  });
  const { getOperation } = useGetOperation(operationId);
  const { updateOperation } = useUpdateOperation({
    id: operationId,
    onCompleteHandler: (data) => dispatch(setLastOperation(data)),
  });
  const { categories } = useGetCategoryList({});

  useEffect(() => {
    (async () => {
      if (operationId) {
        const operationToEdit = await getOperation();

        if (operationToEdit) {
          const initialFormData = transformOperationToFormData(operationToEdit);
          setInitialData(initialFormData);
          setOnSubmit(() => handleUpdateOperation);
        } else {
          navigateToOpeartions(); // throw new Error(`Cannot find operation with ID ${id}`);
        }
      } else {
        setOnSubmit(() => handleAddOperation);
      }

      setIsOperationDialogOpen(true);
    })();
  }, [operationId]);

  // TODO: set real data
  const handleAddOperation = useCallback<OnSubmit>(
    (data) => {
      const newOperation: OperationAddInput = transformFormDataToOpearionInput(data);
      addOperation(newOperation).then(() => navigateToOpeartions());
    },
    [navigateToOpeartions]
  );

  const handleUpdateOperation = useCallback<OnSubmit>(
    (data) => {
      const updatedOperation: OperationUpdateInput = transformFormDataToOpearionInput(data);
      updateOperation(updatedOperation).then(() => navigateToOpeartions());
    },
    [navigateToOpeartions]
  );

  return (
    <Modal visible={isOperationDialogOpen} onClose={navigateToOpeartions}>
      <OperationForm categories={categories} onSubmit={onSubmit} initialData={initialData} />
    </Modal>
  );
};

export default OperationDialogPage;
