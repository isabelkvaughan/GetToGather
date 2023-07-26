import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;

// Query with a filter for upcoming events
export const QUERY_EVENTS = gql`
  query {
    events {
      _id
      name
      date
      location
      description
    }
  }
`;

