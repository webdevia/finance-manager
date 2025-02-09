import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Form from 'src/shared/ui/Forms/Form/Form';
import InputField from 'src/shared/ui/Forms/FormFields/InputField/InputField';
import Button from 'src/shared/ui/Button/Button';
import ActionButtons from 'src/shared/ui/ActionButtons/ActionButtons';
import Title from 'src/shared/ui/Title/Title';

import {
  CategorySchema,
  CategorySchemaType,
} from 'src/features/category/updateCategory/ui/CategoryForm/categoryForm.schema';

export type OnSubmit = (data: CategorySchemaType) => void;

type CategoryFromProps = {
  onSubmit: OnSubmit;
  initialData?: CategorySchemaType | null;
};

export const CategoryForm = ({ onSubmit, initialData }: CategoryFromProps) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategorySchemaType>({
    shouldUnregister: true,
    resolver: zodResolver(CategorySchema),
    defaultValues: { ...initialData, photo: initialData?.photo ?? '' },
  });

  const withReset = (onSubmit: OnSubmit) => (data: CategorySchemaType) => {
    onSubmit?.(data);
    reset({});
  };

  const SubmitButton = () => (
    <Button type="submit" stretch>
      Submit
    </Button>
  );

  return (
    <>
      <Title>Category</Title>
      <Form
        onSubmit={handleSubmit(withReset(onSubmit))}
        fields={
          <>
            <InputField
              label="Name"
              inputId="name"
              name="name"
              register={register}
              type="text"
              errors={errors.name}
              required={true}
            />
            <InputField
              label="Photo"
              inputId="photo"
              name="photo"
              register={register}
              type="text"
              errors={errors.photo}
              required={false}
            />
          </>
        }
        buttons={<ActionButtons buttons={[{ button: <SubmitButton key="submitOperation" /> }]} />}
      />
    </>
  );
};
