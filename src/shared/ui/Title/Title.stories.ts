import type { Meta } from '@storybook/react';
import Title from './Title';

const lorem = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam, dignissimos.';

const meta: Meta<typeof Title> = {
  title: 'Example/Common/Title',
  component: Title,
  tags: ['autodocs'],
};

export default meta;

export const Sample = {
  args: {
    text: lorem,
    transform: 'capitalize',
    full: false,
  },
};
