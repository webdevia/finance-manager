import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'src/shared/ui/Button/Button';

const AddOperationButton = () => {
  const navigate = useNavigate();
  return <Button onClick={() => navigate('/operations/add')}>Add Operation</Button>;
};

export default AddOperationButton;
