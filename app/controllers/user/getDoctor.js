const APIError = require('../../shared/error/APIError');
const userService = require('../../services/user/getDoctor');

exports.getDoctor = async (req, res, next) => {

    if (!req.user) {
        return next(new APIError(401, "Authentication required"));
    }
    const { id } = req.params;
    try {
        const doctor = await userService.getDoctor(id);
        res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            doctor
        })
    } catch (error) {
        next(error);
    }
}