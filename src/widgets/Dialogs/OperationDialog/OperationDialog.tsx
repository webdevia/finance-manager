import React, { MouseEvent } from 'react';
import Modal from 'src/shared/ui/Modal/Modal';
import OperationForm, { OnSubmit } from 'src/shared/ui/Forms/OperationForm/OperationForm';
import { OperationSchemaType } from 'src/shared/ui/Forms/OperationForm/operation-schema';

type SignInDialogProps = {
  visible: boolean;
  onSubmit: OnSubmit;
  initialData?: OperationSchemaType;
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void;
};

const OperationDialog = ({ onSubmit, initialData,  ...modalProps }: SignInDialogProps) => (
  <Modal {...modalProps}>
    <OperationForm onSubmit={onSubmit} initialData={initialData} />
  </Modal>
);

export default OperationDialog;
