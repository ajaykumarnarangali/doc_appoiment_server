const APIError = require('../../shared/error/APIError');
const doctorService = require('../../services/doctor/index');
exports.profileImage = async (req, res, next) => {
    if (!req.user) {
        return next(new APIError(401, 'Authentication required'));
    }
    const { id } = req.user;
    if (!req.file) {
        return next(new APIError(400, 'No image uploaded'));
    }
    try {
        const updatedProfile = await doctorService.profileImage(id, req.file);
        if (!updatedProfile) {
            return res.status(404).json({
                success: false,
                message: 'User not found or update failed',
            });
        }
        res.status(201).json({
            success: true,
            message: 'profile updated success fully',
            doctor: updatedProfile
        })
    } catch (error) {
        next(error);
    }
}