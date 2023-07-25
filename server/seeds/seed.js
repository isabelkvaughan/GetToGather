const fs = require("fs");
const mongoose = require("mongoose");
const Event = require("../models/Event");

//seeding mock up data in seedData json file
const seedData = async () => {
  try {
    //mongoDB connection
    await mongoose.connect();
  } catch (err) {
    console.error(err);
  }
};
