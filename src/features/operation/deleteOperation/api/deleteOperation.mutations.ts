import { gql } from '@apollo/client';

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
