const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Event {
    _id: ID!
    name: String!
    date: String!
    description: String!
  }

  type Query {
    events: [Event!]!
  }
  type User {
    _id: ID
    username: String
    email: String
    password: String
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
