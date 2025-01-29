import type { Meta } from '@storybook/react';
import { Profile } from './Profile';

const meta: Meta<typeof Profile> = {
    title: 'Example/Forms/ProfileForm',
    component: Profile,
    tags: ['autodocs'],
};

export default meta;

export const Sample = {
    args: {
    },
};
