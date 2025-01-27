import React, { FormEvent, useState } from 'react';
import type { Meta } from '@storybook/react';

import Modal from './Modal';
import Input from '../Input/Input';
import Button from '../Button/Button';

const TestModal = () => {
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);
  const saveValue = (event: FormEvent<HTMLInputElement>) => setValue(event.currentTarget.value);

  return (
    <div>
      <Input value={value} onInput={saveValue} />
      <Button onClick={toggleModal}>Open Modal</Button>
      <Modal visible={isOpen} onClose={toggleModal}>
        {value}
      </Modal>
    </div>
  );
};

const meta: Meta<typeof TestModal> = {
  component: TestModal,
  title: 'Example/Common/Modal',
  tags: ['autodocs'],
};

export default meta;

export const Sample = {};
