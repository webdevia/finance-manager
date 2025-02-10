import { gql } from '@apollo/client';

export const PASSWORD_MUTATION = gql`
  mutation ChangePassword($input: ChangePasswordInput!) {
    profile {
      password {
        change(input: $input) {
          success
        }
      }
    }
  }
`;
