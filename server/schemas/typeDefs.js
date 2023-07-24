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
`;

module.exports = typeDefs;
