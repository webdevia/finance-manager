import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { BankOperation } from 'src/entities/operation/Operation';

interface OperationsState {
  operations: BankOperation[];
}

const initialState: OperationsState = {
  operations: [],
};

const operationsSlice = createSlice({
  name: 'operations',
  initialState,
  reducers: {
    addOperation: (state, action: PayloadAction<BankOperation>) => {
      state.operations.push(action.payload);
    },
    updateOperation: (state, action: PayloadAction<BankOperation>) => {
      const index = state.operations.findIndex((op) => op.id === action.payload.id);
      if (index !== -1) {
        state.operations[index] = action.payload;
      }
    },
    deleteOperation: (state, action: PayloadAction<string>) => {
      state.operations = state.operations.filter((op) => op.id !== action.payload);
    },
    setOperations: (state, action: PayloadAction<BankOperation[]>) => {
      state.operations = action.payload;
    },
  },
});

export const { addOperation, updateOperation, deleteOperation, setOperations } = operationsSlice.actions;
export default operationsSlice.reducer;
