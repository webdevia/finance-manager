import type { Meta } from '@storybook/react';
import { OperationCard } from './OperationCard';

const meta: Meta<typeof OperationCard> = {
    title: 'Example/Banking/OperationCard',
    component: OperationCard,
    tags: ['autodocs'],
};

export default meta;

export const Sample = {
    args: {
        amount: 100,
        category: 'Category Name',
        name: 'Item Name',
        description: 'This is a brief description of the item. This is a brief description of the item. This is a brief description of the item.',
        date: '20.09.2024'
    },
};
