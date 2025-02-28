import { Category, CategoryAddInput } from 'src/entities/category/types/category.types';
import { CategorySchemaType } from '../ui/CategoryForm/categoryForm.schema';

export const transformCategoryToFormData = (category: Category): CategorySchemaType => ({
  name: category.name,
  photo: category.photo ?? '',
});

export const transformFormDataToCategoryInput = (formData: CategorySchemaType): CategoryAddInput => ({
  name: formData.name,
  photo: formData.photo ?? '',
});
