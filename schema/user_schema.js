const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    "name": {
        type: String,
    },
    "username": {
        required: true,
        type: String,
        unique: true
    },
    "imageUrl": {
        type: String,
    },
    "email": {
        required: true,
        type: String,
        unique: true
    },
    "phone": {
        type: String,
    },
    "password": {
        required: true,
        type: String,
    },
    "bio": {
        type: String,
    },
    "github": {
        type: String,
    },
    "linkedIn": {
        type: String,
    },
    "tags": {
        type: [String],
    },
    "college": {
        type: String,
    },
    "branch": {
        type: String,
    },
    "passoutYear": {
        type: String,
    },
    "totalProjects": {
        type: Number,
    },
});

module.exports = mongoose.model("user", userSchema);

// phone: '1234567890',
// bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
// github: 'https://github.com/suyog73',
// linkedIn: 'https://www.linkedin.com/in/suyog-patil7/',
// tags: ['tag1', 'tag2', 'tag3'],
// college: "Walchand College of Engineering, Sangli",
// branch: "Information Technolgy",
// batch: "2024 Batch",
// totalProjects: 10,
// };