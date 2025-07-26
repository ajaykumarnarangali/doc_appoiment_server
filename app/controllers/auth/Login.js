const APIError = require('../../shared/error/APIError');
const { validateWithSchema } = require('../../utils/schemaValidation');
const userLoginSchema = require('../../validators/loginSchema');
const authService = require('../../services/auth/authService');


exports.Login = async (req, res, next) => {

    const { error } = validateWithSchema(userLoginSchema, req.body);

    if (error) {
        return next(new APIError(400, error.details[0].message));
    }

    try {

        const result = await authService.loginUser(req.body);

        if (result.isOtpSent) {

            if (result.mailInfo && result.mailInfo?.messageId) {
                return res.status(201).json({
                    success: true,
                    message: 'User logged in successfully. OTP sent to email.',
                    requires_otp: true
                });
            }

            return res.status(500).json({
                success: false,
                message: 'Login verified, but failed to send OTP email. Try again or contact support.',
                requires_otp: false
            })
        }

        return res.cookie('refresh_token', result?.refresh_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        }).status(201).json({
            message: "user logged in succsessfully",
            success: true,
            access_token: result?.access_token
        })

    } catch (error) {
        next(error);
    }

}