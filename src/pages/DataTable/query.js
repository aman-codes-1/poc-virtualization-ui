import { gql } from "@apollo/client";

const FETCH_USER_SERVER = gql`
  query FetchUser($limit: Int, $cursor: String) {
    getAllUsers(limit: $limit, cursor: $cursor) {
      cursor
      count
      node {
        originalId
        name
        email
        phone
        city
        geolocation
        website
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
    getCount {
      count
    }
  }
`;

const FETCH_USER_CLIENT = gql`
  query FetchUser($limit: Int, $cursor: String) {
    getAllUsers(limit: $limit, cursor: $cursor) {
      cursor
      count
      node {
        originalId
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
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

const DATA_COUNT = gql`
  query DataCount($limit: Int, $cursor: String) {
    getAllUsers(limit: $limit, cursor: $cursor) {
      message
      count
    }
  }
`;

export { FETCH_USER_SERVER, FETCH_USER_CLIENT, DATA_COUNT };
