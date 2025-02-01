import React, { MouseEvent } from 'react';
import Modal from 'src/shared/ui/Modal/Modal';
import OperationForm, { OnSubmit } from 'src/shared/ui/Forms/OperationForm/OperationForm';

type SignInDialogProps = {
  visible: boolean;
  onSubmit: OnSubmit;
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void;
};

const OperationDialog = ({ onSubmit, ...modalProps }: SignInDialogProps) => (
  <Modal {...modalProps}>
    <OperationForm onSubmit={onSubmit} />
  </Modal>
);

export default OperationDialog;
