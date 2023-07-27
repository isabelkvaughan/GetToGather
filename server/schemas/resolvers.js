const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");
const { Event } = require("../models");

const resolvers = {
  Query: {
    events: async (parent, { username }) => {
      try {
        const params = username ? { username } : {};
        return Event.find(params).sort({ createdAt: -1 });
      } catch (error) {
        throw new Error("Error fetching events:", error);
      }
    },
    event: async (parent, { eventId }) => {
      try {
        const events = await Event.findOne({ _id: eventId });
        return events;
      } catch (error) {
        throw new Error("Error fetching events:", error);
      }
    },
    users: async () => {
      return User.find().populate("events");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("events");
    },
    // users: async () => {
    //   return User.find();
    // },
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    addEvent: async (
      parent,
      { name, date, description, location },
      context
    ) => {
      if (context.user) {
        const event = await Event.create({
          name,
          date,
          description,
          location,
          eventCreator: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { events: event._id } }
        );

        return event;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
