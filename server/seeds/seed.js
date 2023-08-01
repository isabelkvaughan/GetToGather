const fs = require("fs");
const mongoose = require("mongoose");
const Event = require("../models/Event");

//seeding mock up data in seedData json file
const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb://localhost:27017/events_db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing items in the database
    await Event.deleteMany();

    // Read the seed data from the JSON file
    const rawData = fs.readFileSync("./seeds/seedData.json");
    const eventsData = JSON.parse(rawData);

    // Insert the events into the database
    await Event.insertMany(eventsData);

    console.log("Seed data inserted successfully!");
    // Close the connection after seeding
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding data:", err);
  }
};

seedData();
