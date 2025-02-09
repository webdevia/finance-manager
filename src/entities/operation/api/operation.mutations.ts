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
