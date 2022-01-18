const mongoose = require("mongoose");

const LibrarySchema = new mongoose.Schema({
  owner: {name:String,
          googleid: String,
        }, //unique user object
  mybooks: [String], //array of book id
});

// compile model from schema
module.exports = mongoose.model("library", LibrarySchema);
