const APIError = require('../../shared/error/APIError');
const userService = require('../../services/user/index.js');

exports.getUser = async (req, res, next) => {

    if (!req.user) {
        return next(new APIError(401, "Authentication required"));
    }
    const { id } = req.user;
    try {
        const user = await userService.getUser(id);
        res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            user
        })
    } catch (error) {
        next(error);
    }
}