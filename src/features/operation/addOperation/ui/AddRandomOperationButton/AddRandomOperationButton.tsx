import React from 'react';
import Button from 'src/shared/ui/Button/Button';
import { useAddOperation, UseAddOperation } from 'src/features/operation/addOperation/hooks/useAddOperation';
import { createRandomOperation } from 'src/entities/operation/lib/operation.lib';
import { getRandomItemFromArray } from 'src/shared/utils/dataGenerationUtils/dataGenerators';
import { OperationType } from 'src/entities/operation/types/operation.types';

const getRandomOperationType = () => getRandomItemFromArray(Object.values(OperationType));

export const AddRandomOperationButton = ({ onCompleteHandler }: UseAddOperation) => {
  const { addOperation } = useAddOperation({ onCompleteHandler });
  return (
    <Button
      onClick={() => {
        addOperation(createRandomOperation(getRandomOperationType()));
      }}
    >
      Add Random Operation
    </Button>
  );
};
