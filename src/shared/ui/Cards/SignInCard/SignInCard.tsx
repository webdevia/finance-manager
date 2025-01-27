import React from 'react';
import SignInForm, { OnSubmit } from '../../Forms/SignInForm/SignInForm';
import ActionButtons from '../../ActionButtons/ActionButtons';
import Button from '../../Button/Button';
import Title from '../../Title/Title';

import s from "./SignInCard.module.scss"

const LoginButton = () => <Button type="submit">Login</Button>;
const onSubmit: OnSubmit = (data) => {
  console.log('SUBMIT', data);
};

const SignInCard = () => (
  <div className={s.container}>
    <Title>Login</Title>
    <SignInForm
      onSubmit={onSubmit}
      buttons={<ActionButtons buttons={[{ buttonPosition: 'right', button: <LoginButton key="loginButton" /> }]} />}
    />
  </div>
);

export default SignInCard;
