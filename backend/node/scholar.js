const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScholarSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    department_id: {
        type: String,
        required: true
    },
    gscholar_id: String,
    vidwan_id: String,
    orcid_id: String
})

module.exports = mongoose.Model("Scholar", ScholarSchema);