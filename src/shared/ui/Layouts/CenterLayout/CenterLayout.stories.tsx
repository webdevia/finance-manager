import React from 'react';
import type { Meta } from '@storybook/react';
import Button from '../../Button/Button';
import CenterLayout from './CenterLayout';

const Button1 = () => <Button>Button 1</Button>;
const Button2 = () => <Button>Button 2</Button>;
const Button3 = () => <Button>Button 3</Button>;

const meta: Meta<typeof CenterLayout> = {
  title: 'Example/Common/Layouts/Center',
  component: CenterLayout,
  tags: ['autodocs'],
};

export default meta;

export const Sample = {
  args: {
    center: (
      <>
        <Button1 />
        <Button2 />
        <Button3 />
      </>
    ),
  },
};
