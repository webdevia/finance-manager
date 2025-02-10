import { gql } from '@apollo/client';

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
