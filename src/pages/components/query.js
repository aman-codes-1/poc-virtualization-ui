import { gql } from "@apollo/client";

const GET_USER_DETAIL = gql`
  query GetUserDetail($id: ID!) {
    getUser(id: $id) {
      data {
        name
        email
        phone
        city
        geolocation
        website
        company
        fullDetails {
          businessHistory {
            name
            date
            amount
          }
          accountHistory {
            name
            number
            type
          }
        }
        role
        createdAt
      }
    }
  }
`;

export { GET_USER_DETAIL };
