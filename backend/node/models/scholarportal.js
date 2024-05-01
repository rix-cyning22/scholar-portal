const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScholarPortalSchema = new Schema({
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
  gscholarId: String,
  vidwanId: String,
  orcidId: String,
});

module.exports = mongoose.model("Scholar", ScholarPortalSchema);
