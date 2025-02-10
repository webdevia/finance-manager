import { gql } from '@apollo/client';

export const ADD_CATEGORY = gql`
  mutation AddCategory($input: CategoryAddInput!) {
    categories {
      add(input: $input) {
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

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($patchId: ID!, $input: CategoryUpdateInput!) {
    categories {
      patch(id: $patchId, input: $input) {
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
