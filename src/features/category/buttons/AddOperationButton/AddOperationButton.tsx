import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'src/shared/ui/Button/Button';

const AddCategoryButton = () => {
  const navigate = useNavigate();
  return <Button onClick={() => navigate('/categories/add')}>Add Category</Button>;
};

export default AddCategoryButton;
