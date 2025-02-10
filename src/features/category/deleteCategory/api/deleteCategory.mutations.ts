import { gql } from '@apollo/client';

export const REMOVE_CATEGORY = gql`
  mutation RemoveCategory($removeId: ID!) {
    categories {
      remove(id: $removeId) {
        id
        name
        photo
        createdAt
        updatedAt
        commandId
      }
    }
  }
`;
