import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'src/shared/ui/Button/Button';

export const AddOperationButton = () => {
  const navigate = useNavigate();
  return <Button onClick={() => navigate('/operations/add')}>Add Operation</Button>;
};
