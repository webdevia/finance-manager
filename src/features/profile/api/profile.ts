import { gql } from '@apollo/client';

export const PROFILE_QUERY = gql`
  query Profile {
    profile {
      id
      email
      name
      signUpDate
    }
  }
`;

export const PROFILE_MUTATION = gql`
  mutation Update($input: UpdateProfileInput!) {
    profile {
      update(input: $input) {
        commandId
        email
        id
        name
        signUpDate
      }
    }
  }
`;
