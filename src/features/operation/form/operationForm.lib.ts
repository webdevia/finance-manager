import { Operation, OperationAddInput, OperationType } from 'src/entities/operation/operation.types';
import { OperationSchemaType } from './operationForm.schema';

export const transformOperationToFormData = (operation: Operation): OperationSchemaType => ({
  amount: operation.amount,
  category: operation.category.name,
  date: operation.date,
  name: operation.name,
  desc: operation.desc ?? '',
  type: operation.type as OperationType,
});

export const transformFormDataToOpearionInput = (formData: OperationSchemaType): OperationAddInput => ({
  amount: formData.amount,
  categoryId: formData.category,
  date: formData.date,
  name: formData.name,
  desc: formData.desc,
  type: formData.type as OperationType,
});
