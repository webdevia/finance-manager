import type { Meta } from '@storybook/react';
import { ProfileForm } from './ProfileForm';

const meta: Meta<typeof ProfileForm> = {
    title: 'Example/Forms/ProfileForm',
    component: ProfileForm,
    tags: ['autodocs'],
};

export default meta;

export const Sample = {
    args: {
    },
};
