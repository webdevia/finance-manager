import type { Meta } from '@storybook/react';
import { OperationList } from '../OperationList';
import { createRandomOperation } from '../../../entities/Operation/Operation';

const meta: Meta<typeof OperationList> = {
  title: 'Example/Banking/OperationList',
  component: OperationList,
  tags: ['autodocs'],
};

export default meta;

export const Sample = {
  args: {
    operations: [createRandomOperation(new Date().toISOString()), createRandomOperation(new Date().toISOString())],
  },
};
