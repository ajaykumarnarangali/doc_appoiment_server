const mongoose = require('mongoose');

const dummyImage = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-png%2Fprofile-icon&psig=AOvVaw29R-OI1D5c_eOD8OvAJ7c8&ust=1753892502840000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPitqvG84o4DFQAAAAAdAAAAABAE'
const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        default: dummyImage
    },
    public_id: {
        type: String,
        default: ''
    }
});
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    gender: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: String
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'doctor', 'admin'],
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    MFA_Enabled: {
        type: Boolean,
        default: false
    },
    image: {
        type: imageSchema
    },
    experience: {
        type: Number
    },
    fees: {
        type: Number
    },
    about: {
        type: String
    },
    speciality: {
        type: String
    },
    degree: {
        type: String
    },
    working: {
        from: String,
        to: String,
        time:String
    },
    notAvailableDays: {
        type: [String]
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);