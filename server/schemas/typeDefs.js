const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Event {
    _id: ID!
    name: String!
    date: String!
    location: String!
    description: String!
  }

  type Query {
    events: [Event!]!
    users: [User!]!
    user(username: String!): User
  }
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
