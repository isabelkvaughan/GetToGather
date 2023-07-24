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
`;

module.exports = typeDefs;
