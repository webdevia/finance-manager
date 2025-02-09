import React from 'react';
import Button from 'src/shared/ui/Button/Button';
import { useAddOperation, UseAddOperation } from 'src/features/operation/hooks/useAddOperation';
import { createRandomOperation } from 'src/entities/operation/operation.lib';
import { getRandomItemFromArray } from 'src/shared/data-generation-utils/data-generator';
import { OperationType } from 'src/entities/operation/operation.types';

const getRandomOperationType = () => getRandomItemFromArray(Object.values(OperationType));

const AddRandomOperationButton = ({ onCompleteHandler }: UseAddOperation) => {
  const { addOperation } = useAddOperation({ onCompleteHandler });
  return (
    <Button onClick={() => addOperation(createRandomOperation(getRandomOperationType()))}>Add Random Operation</Button>
  );
};

export default AddRandomOperationButton;
