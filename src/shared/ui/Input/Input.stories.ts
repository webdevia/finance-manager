import type { Meta } from '@storybook/react';
import Input from './Input';

const meta: Meta<typeof Input> = {
  title: 'Example/Common/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;

export const Sample = {
  args: {
    value: 'TEST',
  },
};
