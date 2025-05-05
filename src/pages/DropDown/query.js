import { gql } from "@apollo/client";

const FETCH_USER = gql`
  query FetchUser($limit: Int) {
    getAllEmails(limit: $limit) {
      node {
        originalId
        email
      }
    }
  }
`;

const FETCH_USER_FOR_DROPDOWN = gql`
  query FetchUser($limit: Int, $cursor: String) {
    getAllUsers(limit: $limit, cursor: $cursor) {
      cursor
      node {
        originalId
        name
        email
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export { FETCH_USER, FETCH_USER_FOR_DROPDOWN };
