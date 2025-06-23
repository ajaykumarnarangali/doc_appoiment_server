const mongoose = require('mongoose');

const refreshSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
},{timestamps:true});

module.exports = mongoose.model('RToken', refreshSchema);