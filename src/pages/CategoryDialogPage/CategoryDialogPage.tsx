import React, { useCallback, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import Modal from 'src/shared/ui/Modal/Modal';
import { transformFormDataToOpearionInput } from 'src/features/operation/form/operationForm.lib';
import { useAddCategory } from 'src/features/category/hooks/useAddCategory';
import { useGetCategory } from 'src/features/category/hooks/useGetCategory';
import { useUpdateCategory } from 'src/features/category/hooks/useUpdateCategory';
import {
  transformCategoryToFormData,
  transformFormDataToCategoryInput,
} from 'src/features/category/form/categoryForm.lib';
import { CategorySchemaType } from 'src/features/category/form/categoryForm.schema';
import { CategoryAddInput, CategoryUpdateInput } from 'src/entities/category/category.types';
import CategoryForm, { OnSubmit } from 'src/features/category/form/ui/CategoryForm/CategoryForm';

const CategoryDialogPage = () => {
  const [isOperationDialogOpen, setIsOperationDialogOpen] = useState(false);
  const [onSubmit, setOnSubmit] = useState<OnSubmit>(() => {});
  const [initialData, setInitialData] = useState<CategorySchemaType | null>(null);
  const navigate = useNavigate();
  const navigateToCategories = useCallback(() => navigate('/categories'), [navigate]);
  const location = useLocation();
  const { id } = useParams();
  const hasAddRoute = location.pathname.endsWith('/categories/add');
  const canBeProcessed = id || hasAddRoute;

  if (!canBeProcessed) {
    return <Navigate to={'/categories'} />;
  }

  const categoryId = id ?? '';

  const { addCategory } = useAddCategory({});
  const { getCategory } = useGetCategory(categoryId);
  const { updateCategory } = useUpdateCategory({
    id: categoryId,
  });

  useEffect(() => {
    (async () => {
      if (categoryId) {
        const categoryToEdit = await getCategory();

        if (categoryToEdit) {
          const initialFormData = transformCategoryToFormData(categoryToEdit);
          setInitialData(initialFormData);
          setOnSubmit(() => handleUpdateOperation);
        } else {
          navigateToCategories();
        }
      } else {
        setOnSubmit(() => handleAddCategory);
      }

      setIsOperationDialogOpen(true);
    })();
  }, [categoryId]);

  // TODO: set real data
  const handleAddCategory = useCallback<OnSubmit>(
    (data) => {
      const newCategory: CategoryAddInput = transformFormDataToCategoryInput(data);
      addCategory(newCategory).then(() => navigateToCategories());
    },
    [navigateToCategories]
  );

  const handleUpdateOperation = useCallback<OnSubmit>(
    (data) => {
      const updatedCategory: CategoryUpdateInput = transformFormDataToCategoryInput(data);
      updateCategory(updatedCategory).then(() => navigateToCategories());
    },
    [navigateToCategories]
  );

  return (
    <Modal visible={isOperationDialogOpen} onClose={navigateToCategories}>
      <CategoryForm onSubmit={onSubmit} initialData={initialData} />
    </Modal>
  );
};

export default CategoryDialogPage;
