const { AuthenticationError } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
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
      return User.find().populate("events").populate("rsvpGoing");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("events").populate("rsvpGoing");
    },
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
    addRsvpGoing: async (parent, { userId, eventId }, context) => {
      if (context.user) {
        try {
          const user = await User.findById(userId);

          if (!user) {
            throw new Error("User not found.");
          }

          const event = await Event.findById(eventId);

          if (!event) {
            throw new Error("Event not found.");
          }

          // Check if user has already RSVP'd to prevent duplicate saves
          if (user.rsvpGoing.includes(eventId)) {
            throw new Error("User has already RSVP'd.");
          }

          // Add the event to the user's rsvpGoing array
          user.rsvpGoing.push(eventId);
          await user.save();

          // Return the updated user to show the rsvpGoing
          return user;
        } catch (error) {
          throw new Error("Error adding RSVP:", error);
        }
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    removeRsvp: async (parent, { userId, eventId }, context) => {
      if (context.user) {
        try {
          const user = await User.findById(userId);

          if (!user) {
            throw new Error("User not found.");
          }

          // Check if user has already RSVP'd to remove it
          if (!user.rsvpGoing.includes(eventId)) {
            throw new Error("User has not RSVP'd.");
          }

          // Use $pull to remove the specific eventId from the rsvpGoing array
          await User.findOneAndUpdate(
            { _id: userId },
            { $pull: { rsvpGoing: eventId } },
            { new: true }
          );

          // Fetch the updated user data from the database
          const updatedUser = await User.findById(userId);

          // Return the updated user to show the refreshed rsvpGoing
          return updatedUser;
        } catch (error) {
          throw new Error("Error removing saved event:", error);
        }
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    removeEvent: async (parent, { eventId }, context) => {
      if (context.user) {
        const event = await Event.findOneAndDelete({
          _id: eventId,
          eventCreator: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { events: event._id } }
        );

        return event;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateEvent: async (
      parent,
      { eventId, name, date, description, location },
      context
    ) => {
      if (!context.user) {
        throw new AuthenticationError(
          "You must be logged in to update an event."
        );
      }
      const event = await Event.findById(eventId);

      // Check if the user trying to update the event is the eventCreator
      if (event.eventCreator !== context.user.username) {
        throw new AuthenticationError(
          "You are not authorized to update this event."
        );
      }
      try {
        // Update the event document
        const updatedEvent = await Event.findByIdAndUpdate(
          eventId,
          { name, date, description, location },
          { new: true }
        );
        console.log("Updated event:", event);
        return updatedEvent;
      } catch (err) {
        throw new Error("Failed to update event");
      }
    },
  },
};

module.exports = resolvers;
