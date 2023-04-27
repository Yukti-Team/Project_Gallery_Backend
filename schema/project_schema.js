const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    pname: {
        type: String,
        required: true
    },
    pimages: {
        type: [String],
    },
    plogo: {
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
    gitHubLink: {
        type: String,
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
    groupArray: {
        type: [String]
    },
    branch: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 1
    },
    sponsor: {
        type: String,
    },
    sponsorEmail: {
        type: String,
    },
    guide: {
        type: String,
        required: true
    },
    guideEmail: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Project", projectSchema);
