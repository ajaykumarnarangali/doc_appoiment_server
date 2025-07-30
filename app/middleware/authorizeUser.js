const jwt = require('jsonwebtoken');
const APIError = require('../shared/error/APIError');

function authorizeUser(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new APIError(401, 'Authorization token missing or invalid');
    }

    const token = authHeader.split(' ')[1];
    console.log(token);

    jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
        if (err) {
            return next(new APIError(401, 'Token is invalid'));
        }
        req.user = decoded;
        next()
    })

}

function authorizeRole(...allowedRoles) {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (!userRole || !allowedRoles.includes(userRole)) {
            return next(new APIError(403, 'Access denied: insufficient permissions'));
        }
        next();
    }
}

module.exports = {
    authorizeUser,
    authorizeRole
}