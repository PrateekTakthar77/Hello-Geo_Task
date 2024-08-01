const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        required: true,
        default: mongoose.Types.ObjectId,
    },
    permalink: {
        type: String,
        unique: true,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        unique: true,
        required: true,
    },
    userPassword: {
        type: String,
        required: true,
    },
    enabled: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
