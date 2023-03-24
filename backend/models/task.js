const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  task: String,
});

module.exports = mongoose.model("tasks", schema);
