const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  assignedTo: String,
  priority: String,
  dueDate: String,
  status: {
    type: String,
    default: "Pending"
  },
  submission: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("task", taskSchema);