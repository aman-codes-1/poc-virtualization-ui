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

export { FETCH_USER };
