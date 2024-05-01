const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  insttId: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  deptId: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("User", User);
