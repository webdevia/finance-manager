import React from 'react';
import type { Meta } from '@storybook/react';
import { Layout } from './Layout';

const meta: Meta<typeof Layout> = {
  title: 'Example/Common/Layout',
  component: Layout,
  tags: ['autodocs'],
};

export default meta;

export const Sample = {
  args: {},
};
