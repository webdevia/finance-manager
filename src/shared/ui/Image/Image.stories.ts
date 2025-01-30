import type { Meta } from '@storybook/react';
import Image from './Image';

const meta: Meta<typeof Image> = {
  title: 'Example/Common/Image',
  component: Image,
  tags: ['autodocs'],
};

export default meta;

export const Sample = {
  args: {
    title: 'Test image',
    url: 'https://placehold.co/600x400?text=Hello+World',
  },
};
