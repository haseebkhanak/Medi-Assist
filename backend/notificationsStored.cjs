const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    fromUserId: {
        type: String,
        required: true
    },
    toUserId: {
        type: String,
        required: true
    },
    patientdetails: {
        type: Object,
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
}, { timestamps: true });

module.exports = mongoose.model('Notification', NotificationSchema);
