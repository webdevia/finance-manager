import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { graphqlClient as client } from 'src/app/providers';
import { OPERATION_LIST_QUERY, ADD_OPERATION_MUTATION } from './api/operation';
import { ApolloError } from '@apollo/client';

import { BankOperation, createRandomOperation } from 'src/entities/operation/Operation';

export type OperationInputFields = {
  input: {
    name: string;
    amount: number;
    date: string;
    type: 'Cost' | 'Profit';
    categoryId: string;
  };
};

export type OperationField = 'name';

export type OperationError = {
  fields: OperationField[];
  message: string;
};

type ServerErrorExtension = {
  code: string;
};

type ErrorFieldsMap = Record<string, OperationField[]>;
const errorFieldsMap: ErrorFieldsMap = {
  VALIDATION: ['name'],
};

export const handleOperationError = (serverError: ApolloError): OperationError => {
  const message = serverError.cause?.message || '';
  const extensions = serverError.cause?.extensions;
  const serverErrorExtension = extensions as ServerErrorExtension;
  const fields = errorFieldsMap[serverErrorExtension.code];

  return { fields: fields ?? [], message };
};

export const handleUnknownError = (serverError: string): OperationError => {
  return { fields: [], message: serverError };
};

export const fetchOperations = createAsyncThunk('operations/fetchOperations', async () => {
  const { data } = await client.query({ query: OPERATION_LIST_QUERY });
  console.log('MAKE REQUEST', data.operations.getMany.data);
  return data.operations.getMany.data;
});

export const addOperation = createAsyncThunk(
  'operations/addOperation',
  async ({ input }: OperationInputFields, { rejectWithValue }) => {
    try {
      const { data } = await client.mutate({
        mutation: ADD_OPERATION_MUTATION,
        variables: { input },
        refetchQueries: [{ query: OPERATION_LIST_QUERY }],
      });
      return data.operations.add;
    } catch (err) {
      if (err instanceof ApolloError) {
        return rejectWithValue(handleOperationError(err));
      }
      return rejectWithValue(handleUnknownError('An unknown error occurred'));
    }
  }
);

type FetchOperationsStatus = 'fetch_loading' | 'fetch_succeeded' | 'fetch_failed';
type AddOperationsStatus = 'add_loading' | 'add_succeeded' | 'add_failed';

interface OperationsState {
  operations: BankOperation[];
  status: 'idle' | FetchOperationsStatus | AddOperationsStatus;
  error: OperationError | null;
}

const initialState: OperationsState = {
  operations: [],
  status: 'idle',
  error: null,
  // operations: [...Array(10)].map(() => createRandomOperation(new Date().toISOString())),
};

const operationsSlice = createSlice({
  name: 'operations',
  initialState,
  reducers: {
    clearOperations(state) {
      state.operations = [];
    },
    // addOperation: (state, action: PayloadAction<BankOperation>) => {
    //   state.operations.push(action.payload);
    // },
    // updateOperation: (state, action: PayloadAction<BankOperation>) => {
    //   const index = state.operations.findIndex((op) => op.id === action.payload.id);
    //   if (index !== -1) {
    //     state.operations[index] = action.payload;
    //   }
    // },
    // deleteOperation: (state, action: PayloadAction<string>) => {
    //   state.operations = state.operations.filter((op) => op.id !== action.payload);
    // },
    // setOperations: (state, action: PayloadAction<BankOperation[]>) => {
    //   state.operations = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOperations.pending, (state) => {
        console.log('fetch_loading');
        state.status = 'fetch_loading';
      })
      .addCase(fetchOperations.fulfilled, (state, action) => {
        console.log('fetch_succeeded');
        state.status = 'fetch_succeeded';
        state.operations = action.payload;
        console.dir(action.payload);
      })
      .addCase(fetchOperations.rejected, (state, action) => {
        console.log('fetch_failed');
        state.status = 'fetch_failed';
        state.error = action.payload as OperationError;
      })
      .addCase(addOperation.pending, (state) => {
        console.log('add_loading');
        state.status = 'add_loading';
      })
      .addCase(addOperation.fulfilled, (state, action) => {
        console.log('add_succeeded');
        state.status = 'add_succeeded';
        state.operations = [...state.operations, action.payload];
        console.dir(state.operations);
      })
      .addCase(addOperation.rejected, (state, action) => {
        console.log('add_failed');
        state.status = 'add_failed';
        state.error = action.payload as OperationError;
      });
  },
});

export const { clearOperations } = operationsSlice.actions;
export default operationsSlice.reducer;
