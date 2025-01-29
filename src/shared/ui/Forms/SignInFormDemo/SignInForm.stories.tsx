import React from 'react';
import type { Meta } from '@storybook/react';

import SignInForm from './SignInForm';
import ActionButtons from '../../ActionButtons/ActionButtons';
import Button from '../../Button/Button';

const SubmitButton = () => <Button type="submit">Submit</Button>;

const meta: Meta<typeof SignInForm> = {
  component: SignInForm,
  title: 'Example/Common/Forms/SignIn',
  tags: ['autodocs'],
};

export default meta;

export const Sample = {
  args: {
    onSubmit: (data: any) => console.log(data),
    buttons: (
      <ActionButtons
        buttons={[{ button: <SubmitButton key="submitButton1" /> }, { button: <SubmitButton key="submitButton2" /> }]}
      />
    ),
  },
};
