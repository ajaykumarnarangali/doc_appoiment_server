const Joi = require('joi');

const userSignupSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('user', 'doctor', 'admin').required()
});

module.exports = userSignupSchema;
