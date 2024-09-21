const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    fromUserId: {
        type: String,
        required: true
    },
    toUserId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    delivered: {
        type: Boolean,
        default: false  // Default is false, meaning the message has not been delivered yet
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model("Chatting", MessageSchema);
