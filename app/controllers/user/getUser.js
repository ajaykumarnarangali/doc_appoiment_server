const APIError = require('../../shared/error/APIError');
const userService = require('../../services/user/index.js');

exports.getUser = async (req, res, next) => {

    if (!req.user) {
        return next(new APIError(403, "user doesn't exist"));
    }
    const { id } = req.user;
    try {
        const user = await userService.getUser(id);
        if (!user) {
            return next(new APIError(403, "failed to fetch user details"));
        }
        res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            user
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}