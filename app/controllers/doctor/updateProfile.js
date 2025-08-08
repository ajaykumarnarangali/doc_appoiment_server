const APIError = require('../../shared/error/APIError');
const doctorService = require('../../services/doctor/index');

exports.updateProfile = async (req, res, next) => {
    if (!req?.user.id) {
        next(new APIError(401, 'Authentication required'))
    }
    const { id } = req.user;
    const payLoad = req.body;
    if (!payLoad) {
        return next(new APIerror(400, 'Request body is missing or malformed'));
    }
    try {
        const updatedProfile = await doctorService.updateProfile(id, payLoad);
        res.status(200).json({
            success: true,
            message: 'doctor profile updated successfully',
            doctor: updatedProfile
        })
    } catch (error) {
        next(error);
    }
}