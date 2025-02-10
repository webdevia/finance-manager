import { gql } from '@apollo/client';

export const ADD_OPERATION = gql`
  mutation AddOperation($input: OperationAddInput!) {
    operations {
      add(input: $input) {
        ... on Profit {
          id
          name
          desc
          date
          createdAt
          updatedAt
          amount
          category {
            id
            name
            photo
            createdAt
            updatedAt
            commandId
          }
          type
          commandId
        }
        ... on Cost {
          id
          name
          desc
          date
          createdAt
          updatedAt
          amount
          category {
            id
            name
            photo
            createdAt
            updatedAt
            commandId
          }
          type
          commandId
        }
      }
    }
  }
`;
