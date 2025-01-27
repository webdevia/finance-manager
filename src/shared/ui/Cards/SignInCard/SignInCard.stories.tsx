import type { Meta } from '@storybook/react';
import SignInCard from './SignInCard';

const meta: Meta<typeof SignInCard> = {
  title: 'Example/Common/Cards/SignInCard',
  component: SignInCard,
  tags: ['autodocs'],
};

export default meta;

export const Sample = {
  args: {
    visible: true,
    onClose: () => alert('Close clicked!'),
  },
};
