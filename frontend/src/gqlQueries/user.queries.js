import { gql } from "@apollo/client";

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
