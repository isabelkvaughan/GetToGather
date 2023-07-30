const { gql } = require("apollo-server-express");
const typeDefs = gql`
  type Event {
    _id: ID!
    name: String!
    date: String!
    description: String!
    location: String!
    eventCreator: String
  }

  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    events: [Event]
    savedEvents: [Event]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    events: [Event]
    event(eventId: ID!): Event
    user(username: String!): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addEvent(
      name: String!
      date: String!
      description: String!
      location: String!
    ): Event
    addSavedEvent(userId: ID!, eventId: ID!): User
    removeSavedEvent(userId: ID!, eventId: ID!): User
    removeEvent(eventId: ID!): Event
  }
`;

module.exports = typeDefs;
