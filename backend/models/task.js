const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  task: String,
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "please provide user"],
  },
});

module.exports = mongoose.model("tasks", schema);
