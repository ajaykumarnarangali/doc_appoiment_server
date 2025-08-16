const APIError = require('../../shared/error/APIError');
const authService = require('../../services/auth/authService');


exports.refreshToken = async (req, res, next) => {

    const incoming_token = req.cookies.refresh_token;

    if (!incoming_token) {
        return next(new APIError(401, 'refresh token missing'));
    }

    try {
        const { new_access_token, new_refresh_token } = await authService.refreshToken(incoming_token);
        return res.status(201).json({
            message: "refresh token fetched successfully",
            success: true,
            access_token: new_access_token
        })

    } catch (error) {
        next(error);
    }

}

