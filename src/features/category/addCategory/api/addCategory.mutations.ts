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
