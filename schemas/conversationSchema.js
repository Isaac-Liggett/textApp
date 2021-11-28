const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  participants: {type: Array, required: true},
  messages: {type: Array, default: []},
  name: {type: String, required: true},
});

var conversation = new mongoose.model('conversation', conversationSchema);

module.exports = conversation;