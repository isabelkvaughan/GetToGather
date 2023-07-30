const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    get: (timestamp) => dateFormat(timestamp),
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  eventCreator: {
    type: String,
    required: true,
    trim: true,
  },
});

const Event = model("Event", eventSchema);

module.exports = Event;
