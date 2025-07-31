const APIError = require('../../shared/error/APIError');
const { validateWithSchema } = require('../../utils/schemaValidation');
const userSignupSchema = require('../../validators/signupSchema');
const authService = require('../../services/auth/authService');

exports.registerUser = async (req, res, next) => {

    console.log("came here");
    const { error } = validateWithSchema(userSignupSchema, req.body);

    if (error) {
        return next(new APIError(400, error.details[0].message));
    }
    try {

        const mailInfo = await authService.registerUser(req.body);

        if (mailInfo && mailInfo.messageId) {
            return res.status(201).json({
                success: true,
                message: 'User registered successfully. OTP sent to email.',
            });
        } else {
            return res.status(500).json({
                success: false,
                message: 'User registered successfully. failure in OTP sent to email.',
            })
        }

    } catch (error) {
        next(error)
    }

}

