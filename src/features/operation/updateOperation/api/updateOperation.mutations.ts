import { gql } from '@apollo/client';

export const UPDATE_OPERATION = gql`
  mutation UpdateOperation($patchId: ID!, $input: OperationUpdateInput!) {
    operations {
      patch(id: $patchId, input: $input) {
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
