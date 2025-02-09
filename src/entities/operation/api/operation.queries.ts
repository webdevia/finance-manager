import { gql } from '@apollo/client';

export const GET_OPERATION = gql`
  query Operation($getOneId: ID!) {
    operations {
      getOne(id: $getOneId) {
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

export const GET_OPERATION_LIST = gql`
  query Operations($input: OperationGetManyInput) {
    operations {
      getMany(input: $input) {
        pagination {
          pageNumber
          pageSize
          total
        }
        data {
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
          }
        }
      }
    }
  }
`;

export const GET_BALANCE = gql`
  query GetBalance {
    operations {
      getMany {
        data {
          ... on Profit {
            amount
            type
          }
          ... on Cost {
            amount
            type
          }
        }
      }
    }
  }
`;
