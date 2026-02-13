const mongoose = require("mongoose");

const awfSchema = new mongoose.Schema({
    s_no:Number,
    enrollment_no:String,
  name: String,
  gender: String,
  address: String,
});

module.exports = mongoose.model("Awf", awfSchema);
