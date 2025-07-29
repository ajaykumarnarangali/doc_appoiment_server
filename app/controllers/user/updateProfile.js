const APIerror = require('../../shared/error/APIError');
const userServie = require('../../services/user/index');

exports.updateProfile = async (req, res, next) => {

    if (!req.user) {
        return next(new APIerror(401, 'Authentication required'));
    }
    const { id } = req.user;
    const payLoad = req.body;
    if (!payLoad) {
        return next(new APIerror(400, 'Request body is missing or malformed'));
    }
    try {
        const updatedProfile = await userServie.updateUser(id, payLoad);
        if (!updatedProfile) {
            return res.status(404).json({
                success: false,
                message: 'User not found or update failed',
            });
        }
        res.status(200).json({
            success: true,
            message: 'user profile updated successfully',
            user: updatedProfile
        })
    } catch (error) {
        next(error);
    }
}