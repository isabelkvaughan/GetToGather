import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const ADD_EVENT = gql`
  mutation addEvent(
    $name: String!
    $date: String!
    $description: String!
    $location: String!
  ) {
    addEvent(
      name: $name
      date: $date
      description: $description
      location: $location
    ) {
      _id
      name
      date
      description
      location
      eventCreator
    }
  }
`;
export const ADD_SAVED_EVENT = gql`
  mutation AddSavedEvent($userId: ID!, $eventId: ID!) {
    addSavedEvent(userId: $userId, eventId: $eventId) {
      _id
      username
      email
      events {
        _id
      }
      savedEvents {
        _id

      }
    }
  }
`;
export const REMOVE_SAVED_EVENT = gql`
  mutation RemoveSavedEvent($userId: ID!, $eventId: ID!) {
    removeSavedEvent(userId: $userId, eventId: $eventId) {
      _id
      username
      email
      events {
        _id
      }
      savedEvents {
        _id
      }
    }
  }
`;