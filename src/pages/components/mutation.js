import { gql } from "@apollo/client";

const UPDATE_USER = gql`
  mutation UpdateUser(
    $originalId: ID!
    $name: String
    $email: String
    $phone: String
    $city: String
    $geolocation: String
    $website: String
    $company: String
    $role: String
  ) {
    updateUser(
      payload: {
        originalId: $originalId
        name: $name
        email: $email
        phone: $phone
        city: $city
        geolocation: $geolocation
        website: $website
        company: $company
        role: $role
      }
    ) {
      originalId
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export { UPDATE_USER, DELETE_USER };
