import { gql } from '@apollo/client';

export const UPDATE_PROFILE = gql`
  mutation Update($input: UpdateProfileInput!) {
    profile {
      update(input: $input) {
        id
      }
    }
  }
`;

