import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  query SignIn($facebookId: String!) {
    token(facebookId: $facebookId)
  }
`;

export const SIGN_UP = gql`
  mutation SignUp(
    $facebookId: String!
    $name: String!
    $dateOfBirth: String!
    $imageURL: String!
  ) {
    addUser(
      facebookId: $facebookId
      name: $name
      dateOfBirth: $dateOfBirth
      imageURL: $imageURL
    ) {
      facebookId
      name
      dateOfBirth
      imageURL
    }
  }
`;

export const GET_SELF = gql`
  query getUser($facebookId: String!) {
    user(facebookId: $facebookId) {
      facebookId
      name
      dateOfBirth
      imageURL
      tasks {
        title
        description
        date
        image
      }
    }
  }
`;
