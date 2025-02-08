import React from 'react';
import Button from 'src/shared/ui/Button/Button';
import { useAddOperation } from 'src/features/operation/hooks/useAddOperation';
import { createRandomOperation } from 'src/entities/operation/operation.lib';
import { getRandomItemFromArray } from 'src/shared/data-generation-utils/data-generator';
import { OperationType } from 'src/entities/operation/operation.types';

const getRandomOperationType = () => getRandomItemFromArray(Object.values(OperationType));

const AddRandomOperationButton = () => {
  const { addOperation } = useAddOperation();
  return (
    <Button onClick={() => addOperation(createRandomOperation(getRandomOperationType()))}>Add Random Operation</Button>
  );
};

export default AddRandomOperationButton;
