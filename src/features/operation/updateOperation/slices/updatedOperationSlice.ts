import { createSlice } from '@reduxjs/toolkit';
import { Operation } from 'src/entities/operation/operation.types';

interface UpdatedOperation {
  updatedOperation: Operation | null;
}

const initialState: UpdatedOperation = {
  updatedOperation: null,
};

const updatedOperationSlice = createSlice({
  name: 'lastOperation',
  initialState,
  reducers: {
    setUpdatedOperation(state, operation) {
      state.updatedOperation = operation.payload;
    },
    clearUpdatedOperation(state) {
      state.updatedOperation = null;
    },
  },
});

export const { setUpdatedOperation, clearUpdatedOperation } = updatedOperationSlice.actions;
export default updatedOperationSlice.reducer;
