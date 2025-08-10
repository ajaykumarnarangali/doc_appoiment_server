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
    address: Joi.required(),
    working: Joi.object({
        from: Joi.string()
            .valid('0', '1', '2', '3', '4', '5', '6')
            .required(),
        to: Joi.string()
            .valid('0', '1', '2', '3', '4', '5', '6')
            .required(),
        time: Joi.string()
            .required()
    }).required()
});

module.exports = doctorRegSchema;

