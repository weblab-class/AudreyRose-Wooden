const mongoose = require("mongoose");

const GrllaUserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  pronouns: String,
  location: String,
  genres: [String], //aray of genres
  current: String, //currently reading
});

// compile model from schema
module.exports = mongoose.model("grllaUser", GrllaUserSchema);
