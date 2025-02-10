import { gql } from '@apollo/client';

export const GET_CATEGORY = gql`
  query Category($getOneId: ID!) {
    categories {
      getOne(id: $getOneId) {
        id
        name
        photo
        createdAt
        updatedAt
        commandId
      }
    }
  }
`;

export const GET_CATEGORY_LIST = gql`
  query Categories {
    categories {
      getMany {
        data {
          id
          name
          photo
          createdAt
          updatedAt
          commandId
        }
      }
    }
  }
`;
