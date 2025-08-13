const Joi = require('joi');

const userLoginSchema = Joi.object({
    doctorId: Joi.string().required(),
    userId: Joi.string().required(),
    date: Joi.string().required(),
    time: Joi.string().required(),
});

module.exports = userLoginSchema;
