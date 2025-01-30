import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import OperationDialog from 'src/shared/ui/Dialogs/OperationDialog/OperationDialog';

const OperationDialogPage = () => {
  const [isOperationDialogOpen, setIsOperationDialogOpen] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const isAddRoute = location.pathname.endsWith('/operations/add');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAddRoute || id) {
      setIsOperationDialogOpen(true);
      //   if (id && id !== 'add') {
      //     const operationToEdit = operations.find((op) => op.id === id);
      //     setEditingOperation(operationToEdit || null);
      //   } else {
      //     setEditingOperation(null);
      //   }
    } else {
      setIsOperationDialogOpen(false);
    }
  }, [id, isAddRoute]);

  return <OperationDialog visible={isOperationDialogOpen} onClose={() => navigate('/operations')} />;
};

export default OperationDialogPage;
