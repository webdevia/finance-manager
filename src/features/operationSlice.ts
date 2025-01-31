import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Operation {
  id: string;
  name: string;
  desc?: string;
  createdAt: string;
  amount: number;
  category: string;
  type: 'Cost' | 'Profit';
}

interface OperationsState {
  operations: Operation[];
}

const initialState: OperationsState = {
  operations: [],
};

const operationsSlice = createSlice({
  name: 'operations',
  initialState,
  reducers: {
    addOperation: (state, action: PayloadAction<Operation>) => {
      state.operations.push(action.payload);
    },
    updateOperation: (state, action: PayloadAction<Operation>) => {
      const index = state.operations.findIndex((op) => op.id === action.payload.id);
      if (index !== -1) {
        state.operations[index] = action.payload;
      }
    },
    deleteOperation: (state, action: PayloadAction<string>) => {
      state.operations = state.operations.filter((op) => op.id !== action.payload);
    },
    setOperations: (state, action: PayloadAction<Operation[]>) => {
      state.operations = action.payload;
    },
  },
});

export const { addOperation, updateOperation, deleteOperation, setOperations } = operationsSlice.actions;
export default operationsSlice.reducer;
