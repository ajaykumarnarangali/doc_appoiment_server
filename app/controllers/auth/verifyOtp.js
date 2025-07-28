const APIError = require('../../shared/error/APIError');
const authService = require('../../services/auth/authService');

exports.verifyOtp = async (req, res, next) => {

    const { email } = req.query;
    const { otp } = req.body;
    
    if (!email) {
        return next(new APIError(403, 'Email is required'))
    }

    if (!otp) {
        return next(new APIError(403, 'otp is required'))
    }

    try {

        const { access_token, refresh_token } = await authService.verifyOtp(email, otp);
        
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        }).status(201).json({
            message: "user registered succsessfully",
            success: true,
            access_token
        })
    } catch (error) {
        next(error)
    }

}

