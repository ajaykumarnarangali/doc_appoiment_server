const generateOtp = require('./generateOtp');
const sendMail = require('./sendMail');
const generateToken = require('./generateToken');
const decodeToken = require('./decodeToken');

function compareOtp(enteredOtp, otpDoc) {
    return enteredOtp === otpDoc.otp;
}

function comparetoken(incoming_token, old_token) {
    return incoming_token === old_token;
}

module.exports = {
    sendMail,
    generateOtp,
    generateToken,
    compareOtp,
    decodeToken,
    comparetoken
}

