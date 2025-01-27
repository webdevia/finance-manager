import type { Meta } from '@storybook/react';
import SignInDialog from './SignInDialog';

const meta: Meta<typeof SignInDialog> = {
  title: 'Example/Common/Dialogs/SignInDialog',
  component: SignInDialog,
  tags: ['autodocs'],
};

export default meta;

export const Sample = {
  args: {
    visible: true,
    onClose: () => alert('Close clicked!'),
  },
};
