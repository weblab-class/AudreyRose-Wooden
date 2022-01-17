const mongoose = require("mongoose");

const ClubSchema = new mongoose.Schema({
  admin: String, //unique user id, creator of club
  members: [String], //array of user ids --> members of club
});

// compile model from schema
module.exports = mongoose.model("club", ClubSchema);
