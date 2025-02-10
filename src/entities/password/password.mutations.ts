import { gql } from '@apollo/client';

export const UPDATE_PASSWORD = gql`
  mutation UpdatePassword($input: ChangePasswordInput!) {
    profile {
      password {
        change(input: $input) {
          success
        }
      }
    }
  }
`;
