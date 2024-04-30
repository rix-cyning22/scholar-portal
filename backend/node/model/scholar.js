const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScholarSchema = new Schema({
  insttId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  deptId: {
    type: String,
    required: true,
  },
  gscholar_id: String,
  vidwan_id: String,
  orcid_id: String,
});

module.exports = mongoose.model("Scholar", ScholarSchema);
