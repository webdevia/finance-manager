import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useIsFieldRequired } from '../../../zod';
import Form from '../Form/Form';
import InputField from '../FormFields/InputField/InputField';
import SelectField, { SelectOptionProps } from '../FormFields/SelectField/SelectField';
import Button from '../../Button/Button';
import ActionButtons from '../../ActionButtons/ActionButtons';
import Title from '../../Title/Title';

import { OperationSchema, OperationSchemaType } from './operation-schema';

const costOperationOption: SelectOptionProps = {
  text: 'Cost',
  value: 'Cost',
};

const profitOperationOption: SelectOptionProps = {
  text: 'Profit',
  value: 'Profit',
};

const OperationForm = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OperationSchemaType>({
    shouldUnregister: true,
    resolver: zodResolver(OperationSchema),
  });

  const onSubmit = (data: OperationSchemaType) => {
    console.log(data);
    reset();
  };

  const isRequired = useIsFieldRequired(OperationSchema);

  const SubmitButton = () => (
    <Button type="submit" stretch>
      Submit
    </Button>
  );

  return (
    <>
      <Title>Operation</Title>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        fields={
          <>
            <SelectField
              label="Operation type"
              name="type"
              options={[costOperationOption, profitOperationOption]}
              register={register}
              errors={errors.type}
              required={isRequired('type')}
            />
            <InputField
              label="Name"
              name="name"
              register={register}
              type="text"
              errors={errors.name}
              required={isRequired('name')}
            />
            <InputField
              label="Category"
              name="category"
              register={register}
              type="text"
              errors={errors.category}
              required={isRequired('category')}
            />
            <InputField
              label="Description"
              name="desc"
              register={register}
              type="text"
              errors={errors.desc}
              required={isRequired('desc')}
            />
            <InputField
              label="Created At"
              name="createdAt"
              register={register}
              type="date"
              errors={errors.createdAt}
              required={isRequired('createdAt')}
            />
            <InputField
              label="Amount"
              name="amount"
              register={register}
              type="number"
              isNumber
              errors={errors.amount}
              required={isRequired('amount')}
            />
          </>
        }
        buttons={<ActionButtons buttons={[{ button: <SubmitButton key="submitOperation" /> }]} />}
      />
    </>
  );
};

export default OperationForm;
