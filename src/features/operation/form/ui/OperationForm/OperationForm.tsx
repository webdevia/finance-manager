import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useIsFieldRequired } from 'src/shared/zod';
import Form from 'src/shared/ui/Forms/Form/Form';
import InputField from 'src/shared/ui/Forms/FormFields/InputField/InputField';
import SelectField, { SelectOptionProps } from 'src/shared/ui/Forms/FormFields/SelectField/SelectField';
import Button from 'src/shared/ui/Button/Button';
import ActionButtons from 'src/shared/ui/ActionButtons/ActionButtons';
import Title from 'src/shared/ui/Title/Title';
import { normalizeDateString } from 'src/shared/datetime-utils';

import { OperationSchema, OperationSchemaType } from '../../operationForm.schema';

const costOperationOption: SelectOptionProps = {
  text: 'Cost',
  value: 'Cost',
};

const profitOperationOption: SelectOptionProps = {
  text: 'Profit',
  value: 'Profit',
};

export type OnSubmit = (data: OperationSchemaType) => void;

type OperationFromProps = {
  onSubmit: OnSubmit;
  initialData?: OperationSchemaType | null;
};

const OperationForm = ({ onSubmit, initialData }: OperationFromProps) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OperationSchemaType>({
    shouldUnregister: true,
    resolver: zodResolver(OperationSchema),
    defaultValues: { ...initialData, date: normalizeDateString(initialData?.date ?? '') },
  });

  const withReset = (onSubmit: OnSubmit) => (data: OperationSchemaType) => {
    onSubmit(data);
    reset({});
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
        onSubmit={handleSubmit(withReset(onSubmit))}
        fields={
          <>
            <SelectField
              label="Operation type"
              inputId="type"
              name="type"
              options={[costOperationOption, profitOperationOption]}
              register={register}
              errors={errors.type}
              required={isRequired('type')}
            />
            <InputField
              label="Name"
              inputId="name"
              name="name"
              register={register}
              type="text"
              errors={errors.name}
              required={isRequired('name')}
            />
            <InputField
              label="Category"
              inputId="category"
              name="category"
              register={register}
              type="text"
              errors={errors.category}
              required={isRequired('category')}
            />
            <InputField
              label="Description"
              inputId="desc"
              name="desc"
              register={register}
              type="text"
              errors={errors.desc}
              required={isRequired('desc')}
            />
            <InputField
              label="Date"
              inputId="date"
              name="date"
              register={register}
              type="date"
              errors={errors.date}
              required={isRequired('date')}
            />
            <InputField
              label="Amount"
              inputId="amount"
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
