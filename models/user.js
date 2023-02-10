const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  avatar: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
});

module.exports = mongoose.model("User", userSchema);
