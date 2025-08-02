const Joi = require('joi');

const doctorRegSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    experience: Joi.required(),
    fees: Joi.required(),
    about: Joi.required(),
    speciality: Joi.required(),
    degree: Joi.required(),
    address: Joi.required()
});

module.exports = doctorRegSchema;

