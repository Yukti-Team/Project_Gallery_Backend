const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    pname: {
        type: String,
        required: true
    },
    pimage: {
        type: String,
        required: true
    },
    pdesc: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    stack: {
        type: [String],
        required: true
    },
    GitHub: {
        type: String,
        required: true
    },
    pUrl: {
        type: String
    },
    ownerId: {
        type: String,
        required: true
    },
    isPrivate: {
        type: Boolean,
        default: false
    },
    isGroup: {
        type: Boolean,
        default: false
    },
    groupArray: {
        type: [String]
    }
});

module.exports = mongoose.model("Project", projectSchema);