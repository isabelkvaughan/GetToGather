const mongoose = require("mongoose");
const dbUrl = "mongodb://localhost:27017/events_db";
mongoose.connect(process.env.MONGODB_URI || dbUrl);

module.exports = mongoose.connection;
//module.exports = { dbUrl };
