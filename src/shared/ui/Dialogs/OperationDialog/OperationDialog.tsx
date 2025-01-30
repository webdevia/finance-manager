import React, { MouseEvent } from 'react';
import Modal from '../../Modal/Modal';
import OperationForm from '../../Forms/OperationForm/OperationForm';

type SignInDialogProps = {
  visible: boolean;
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void;
};

const OperationDialog = (props: SignInDialogProps) => (
  <Modal {...props}>
    <OperationForm />
  </Modal>
);

export default OperationDialog;
