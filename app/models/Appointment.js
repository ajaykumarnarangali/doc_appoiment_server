const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    isPaymentComplete: {
        type: Boolean,
        default: false
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    meetingLink: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'cancelled', 'completed'],
        default: 'pending'
    }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);