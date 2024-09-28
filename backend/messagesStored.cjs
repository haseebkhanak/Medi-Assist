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
        default: false  
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model("Chatting", MessageSchema);
