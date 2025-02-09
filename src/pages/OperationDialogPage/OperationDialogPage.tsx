import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { OperationForm, OnSubmit } from 'src/features/operation/updateOperation/ui/OperationForm';
import Modal from 'src/shared/ui/Modal/Modal';
import { useAddOperation } from 'src/features/operation/addOperation/hooks/useAddOperation';
import { OperationAddInput, OperationUpdateInput } from 'src/entities/operation/operation.types';
import { useGetOperation } from 'src/features/operation/getOperation/hooks/useGetOperation';
import { OperationSchemaType } from 'src/features/operation/updateOperation/ui/OperationForm/operationForm.schema';
import { useUpdateOperation } from 'src/features/operation/updateOperation/hooks/useUpdateOperation';
import {
  transformFormDataToOpearionInput,
  transformOperationToFormData,
} from 'src/features/operation/updateOperation/lib/transformOperation.lib';

import { setUpdatedOperation } from 'src/features/operation/updateOperation/slices/updatedOperationSlice';
import { useDispatch } from 'react-redux';
import { useGetCategoryList } from 'src/features/category/getCategory/hooks/useGetCategoryList';

const OperationDialogPage = () => {
  const [isOperationDialogOpen, setIsOperationDialogOpen] = useState(false);
  const [onSubmit, setOnSubmit] = useState<OnSubmit>(() => null);
  const [initialData, setInitialData] = useState<OperationSchemaType | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateToOpeartions = useCallback(() => navigate('/operations'), [navigate]);
  const location = useLocation();
  const { id } = useParams();
  const hasAddRoute = location.pathname.endsWith('/operations/add');
  const canBeProcessed = id || hasAddRoute;
  const operationId = id ?? '';

  const { addOperation } = useAddOperation({
    onCompleteHandler: (data) => dispatch(setUpdatedOperation(data)),
  });
  const { getOperation } = useGetOperation(operationId);
  const { updateOperation } = useUpdateOperation({
    id: operationId,
    onCompleteHandler: (data) => dispatch(setUpdatedOperation(data)),
  });
  const { categories } = useGetCategoryList();

  const handleAddOperation = useCallback<OnSubmit>(
    (data) => {
      const newOperation: OperationAddInput = transformFormDataToOpearionInput(data);
      addOperation(newOperation).then(() => navigateToOpeartions());
    },
    [navigateToOpeartions, addOperation]
  );

  const handleUpdateOperation = useCallback<OnSubmit>(
    (data) => {
      const updatedOperation: OperationUpdateInput = transformFormDataToOpearionInput(data);
      updateOperation(updatedOperation).then(() => navigateToOpeartions());
    },
    [navigateToOpeartions, updateOperation]
  );

  useEffect(() => {
    (async () => {
      if (canBeProcessed) {
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
      } else {
        navigateToOpeartions();
      }
    })();
  }, [operationId, canBeProcessed, getOperation, handleAddOperation, handleUpdateOperation, navigateToOpeartions]);

  return (
    <Modal visible={isOperationDialogOpen} onClose={navigateToOpeartions}>
      <OperationForm categories={categories} onSubmit={onSubmit} initialData={initialData} />
    </Modal>
  );
};

export default OperationDialogPage;
