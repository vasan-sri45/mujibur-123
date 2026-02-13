const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    s_no:Number,
    enrollment_no:String,
  name: String,
  gender: String,
  address: String,
});

module.exports = mongoose.model("User", userSchema);
