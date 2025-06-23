const jwt = require('jsonwebtoken');

const decodeToken = (token, secret) => {
    try {
        const decoded = jwt.verify(token, secret);
        return { decoded, err: null };
    } catch (err) {
        return { decoded: null, err };
    }
};

module.exports = decodeToken;
