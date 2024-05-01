const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Department = new Schema({
  id: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Department", Department);
