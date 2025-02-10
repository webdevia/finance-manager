import { gql } from '@apollo/client';

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
