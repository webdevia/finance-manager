import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Modal from 'src/shared/ui/Modal/Modal';
import { useAddCategory } from 'src/features/category/addCategory/hooks/useAddCategory';
import { useGetCategory } from 'src/features/category/getCategory/hooks/useGetCategory';
import { useUpdateCategory } from 'src/features/category/updateCategory/hooks/useUpdateCategory';
import {
  transformCategoryToFormData,
  transformFormDataToCategoryInput,
} from 'src/features/category/updateCategory/lib/transformCategory.lib';
import { CategorySchemaType } from 'src/features/category/updateCategory/ui/CategoryForm/categoryForm.schema';
import { CategoryAddInput, CategoryUpdateInput } from 'src/entities/category/category.types';
import { CategoryForm, OnSubmit } from 'src/features/category/updateCategory/ui/CategoryForm';

const CategoryDialogPage = () => {
  const [isOperationDialogOpen, setIsOperationDialogOpen] = useState(false);
  const [onSubmit, setOnSubmit] = useState<OnSubmit>(() => null);
  const [initialData, setInitialData] = useState<CategorySchemaType | null>(null);
  const navigate = useNavigate();
  const navigateToCategories = useCallback(() => navigate('/categories'), [navigate]);
  const location = useLocation();
  const { id } = useParams();
  const hasAddRoute = location.pathname.endsWith('/categories/add');
  const canBeProcessed = id || hasAddRoute;

  const categoryId = id ?? '';

  const { addCategory } = useAddCategory();
  const { getCategory } = useGetCategory(categoryId);
  const { updateCategory } = useUpdateCategory({
    id: categoryId,
  });

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

  useEffect(() => {
    (async () => {
      if (canBeProcessed) {
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
      } else {
        navigateToCategories();
      }
    })();
  }, [categoryId, canBeProcessed, handleAddCategory, handleUpdateOperation, navigateToCategories]);

  return (
    <Modal visible={isOperationDialogOpen} onClose={navigateToCategories}>
      <CategoryForm onSubmit={onSubmit} initialData={initialData} />
    </Modal>
  );
};

export default CategoryDialogPage;
