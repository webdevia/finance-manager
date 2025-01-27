import type { Meta } from '@storybook/react';
import { OperationListWithButton } from '../OperationListWithButton';
import { createRandomOperation } from '../../../entities/operation/Operation';

const meta: Meta<typeof OperationListWithButton> = {
    title: 'Example/Banking/OperationListWithButton',
    component: OperationListWithButton,
    tags: ['autodocs'],
};

export default meta;

export const Sample = {
    args: {
        operations: [
            createRandomOperation(new Date().toISOString()),
            createRandomOperation(new Date().toISOString()),
        ]
    }
};
