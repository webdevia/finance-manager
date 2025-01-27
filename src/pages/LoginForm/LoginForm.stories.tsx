import type { Meta } from '@storybook/react';
import { LoginForm } from './LoginForm';

const meta: Meta<typeof LoginForm> = {
    title: 'Example/Forms/LoginForm',
    component: LoginForm,
    tags: ['autodocs'],
};

export default meta;

export const Sample = {
    args: {
    },
};
