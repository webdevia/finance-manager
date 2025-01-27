import React, { MouseEvent } from 'react';
import SignInForm, { OnSubmit } from '../../Forms/SignInForm/SignInForm';
import ActionButtons from '../../ActionButtons/ActionButtons';
import Button from '../../Button/Button';
import Modal from '../../Modal/Modal';
import Title from '../../Title/Title';

type SignInDialogProps = {
  visible: boolean;
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void;
};

const onSubmit: OnSubmit = (data) => {
  console.log('SUBMIT', data);
};

const onCancel = () => {
  console.log('CANCEL');
};
const LoginButton = () => <Button type="submit">Login</Button>;
const CancelButton = () => (
  <Button type="reset" onClick={onCancel}>
    Cancel
  </Button>
);

const SignInDialog = (props: SignInDialogProps) => (
  <Modal {...props}>
    <Title>Login</Title>
    <SignInForm
      onSubmit={onSubmit}
      buttons={
        <ActionButtons
          buttons={[{ button: <LoginButton key="loginButton" /> }, { button: <CancelButton key="cancelButton" /> }]}
        />
      }
    />
  </Modal>
);

export default SignInDialog;
