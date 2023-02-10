const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  receiverId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  content: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 3000,
  },
});

module.exports = mongoose.model("Message", messageSchema);
