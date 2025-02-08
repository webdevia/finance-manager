import { gql } from '@apollo/client';

export const ADD_OPERATION = gql`
  mutation AddOperation($input: OperationAddInput!) {
    operations {
      add(input: $input) {
        ... on Profit {
          id
        }
        ... on Cost {
          id
        }
      }
    }
  }
`;

export const UPDATE_OPERATION = gql`
  mutation UpdateOperation($patchId: ID!, $input: OperationUpdateInput!) {
    operations {
      patch(id: $patchId, input: $input) {
        ... on Profit {
          id
        }
        ... on Cost {
          id
        }
      }
    }
  }
`;

export const REMOVE_OPERATION = gql`
  mutation RemoveOperation($removeId: ID!) {
    operations {
      remove(id: $removeId) {
        ... on Profit {
          id
        }
        ... on Cost {
          id
        }
      }
    }
  }
`;
