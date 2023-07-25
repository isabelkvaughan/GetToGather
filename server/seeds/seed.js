const fs = require('fs');
const mongoose = require('mongoose');
const Event = require('../models/Event');

const dbUrl = require('../config/connection');





//seeding mock up data in seedData json file
const seedData = async () => {
    try {
        //mongoDB connection 
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        //clearing existing events data
        await Event.deleteMany({});

        //Reading json file data 
        const rawData = fs.readFileSync('seedData.json');
        const eventsData = JSON.parse(rawData);

        //mockup events data sent to collection. 
        await Event.insertMany(eventsData);

        console.log('Database Seeded!');

        //Disconnecting 
        mongoose.disconnect();
    } catch (error) {
        console.error('Error seeding!', error);
    }

    };

    seedData();