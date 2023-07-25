const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Event {
    _id: ID!
    name: String!
    date: String!
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
`;

module.exports = typeDefs;
