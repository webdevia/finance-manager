import { gql } from '@apollo/client';

export const SIGNIN_MUTATION = gql`
mutation Signin($email: String!, $password: String!) {
  profile {
    signin(email: $email, password: $password) {
      token
    }
  }
}
`;

export const SIGNUP_MUTATION = gql`
mutation Signup($email: String!, $password: String!, $commandId: String!) {
  profile {
    signup(email: $email, password: $password, commandId: $commandId) {
      token
    }
  }
}
`;