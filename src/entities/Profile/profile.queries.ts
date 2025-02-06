import { gql } from '@apollo/client';

export const GET_PROFILE = gql`
  query Profile {
    profile {
      id
      email
      name
      signUpDate
    }
  }
`;
