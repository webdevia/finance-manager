import { gql } from '@apollo/client';

export const SIGNUP_MUTATION = gql`
  mutation Signup($email: String!, $password: String!, $commandId: String!) {
    profile {
      signup(email: $email, password: $password, commandId: $commandId) {
        token
      }
    }
  }
`;
