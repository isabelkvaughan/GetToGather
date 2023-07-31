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
export const RSVP_GOING = gql`
  mutation addRsvpGoing($userId: ID!, $eventId: ID!) {
    addRsvpGoing(userId: $userId, eventId: $eventId) {
      _id
      username
      email
      events {
        _id
      }
      rsvpGoing {
        _id
      }
    }
  }
`;
export const REMOVE_RSVP = gql`
  mutation removeRsvp($userId: ID!, $eventId: ID!) {
    removeRsvp(userId: $userId, eventId: $eventId) {
      _id
      username
      email
      events {
        _id
      }
      rsvpGoing {
        _id
      }
    }
  }
`;

export const REMOVE_EVENT = gql`
  mutation removeEvent($eventId: ID!) {
    removeEvent(eventId: $eventId) {
      _id
      name
      date
      description
      location
      eventCreator
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation updateEvent(
    $eventId: ID!
    $name: String!
    $date: String!
    $description: String!
    $location: String!
  ) {
    updateEvent(
      eventId: $eventId
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
