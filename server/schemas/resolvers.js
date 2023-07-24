const { Event } = require('../models');

const resolvers = {
  Query: {
    events: async () => {
      try {
        const events = await Event.find().sort({ date: 1 });
        return events;
      } catch (error) {
        throw new Error('Error fetching events:', error);
      }
    },
  },
  Mutation: {
    // Add mutation resolvers here
  },
};

module.exports = resolvers;
