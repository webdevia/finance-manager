import React from 'react';
import type { Meta } from '@storybook/react';

import ActionButtons from './ActionButtons';
import Button from '../Button/Button';

const TestButton = () => <Button type="submit">Test Button 1</Button>;
const TestButton2 = () => <Button type="submit">Test Button 2</Button>;

const meta: Meta<typeof ActionButtons> = {
  component: ActionButtons,
  title: 'Example/Common/ActionButtons',
  tags: ['autodocs'],
};

export default meta;

export const LeftAndRight = {
  args: {
    buttons: [
      { buttonPosition: 'left', button: <TestButton key="1" /> },
      { buttonPosition: 'left', button: <TestButton2 key="2" /> },
      { buttonPosition: 'right', button: <TestButton key="3" /> },
      { buttonPosition: 'right', button: <TestButton2 key="4" /> },
    ],
  },
};

export const Center = {
    args: {
      buttons: [
        { button: <TestButton key="1" /> },
        { button: <TestButton2 key="2" /> },
      ],
    },
  };
  