const { registerUser } = require('./registerUser');
const { verifyOtp } = require('./verifyOtp');
const { Login } = require('./Login');
const { refreshToken } = require('./refreshToken');

module.exports = {
    registerUser,
    verifyOtp,
    Login,
    refreshToken
}