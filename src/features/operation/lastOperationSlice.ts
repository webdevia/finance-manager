import { createSlice } from '@reduxjs/toolkit';
import { Operation } from 'src/entities/operation/operation.types';

interface LastOperation {
  lastOperation: Operation | null;
}

const initialState: LastOperation = {
  lastOperation: null,
};

const lastOperationSlice = createSlice({
  name: 'lastOperation',
  initialState,
  reducers: {
    setLastOperation(state, operation) {
      state.lastOperation = operation.payload;
    },
    clearLastOperation(state) {
      state.lastOperation = null;
    },
  },
});

export const { setLastOperation, clearLastOperation } = lastOperationSlice.actions;
export default lastOperationSlice.reducer;
