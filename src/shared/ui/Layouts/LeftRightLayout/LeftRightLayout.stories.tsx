import React from 'react';
import type { Meta } from '@storybook/react';
import LeftRightLayout from './LeftRightLayout';
import Button from '../../Button/Button';

const LeftButton1 = () => <Button>Left Button 1</Button>;
const LeftButton2 = () => <Button>Left Button 2</Button>;
const RightButton1 = () => <Button>Right Button 1</Button>;

const meta: Meta<typeof LeftRightLayout> = {
  title: 'Example/Common/Layouts/LeftRight',
  component: LeftRightLayout,
  tags: ['autodocs'],
};

export default meta;

export const Sample = {
  args: {
    left: (
      <>
        <LeftButton1 />
        <LeftButton2 />
      </>
    ),
    right: <RightButton1 />,
  },
};
