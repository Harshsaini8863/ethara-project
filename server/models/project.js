const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  members: [String],
  createdBy: String
});

module.exports = mongoose.model("project", projectSchema);