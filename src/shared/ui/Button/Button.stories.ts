import type { Meta } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Example/Common/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;

export const Sample = {
  args: {
    children: 'Test Button',
    disabled: true,
    onClick: () => alert('Button clicked'),
  },
};
