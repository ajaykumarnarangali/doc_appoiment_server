const jwt = require('jsonwebtoken');

function generateToken(payload, secret, expiresIn = '15m') {
    return jwt.sign(payload, secret, {
        expiresIn
    });
}

module.exports = generateToken;
