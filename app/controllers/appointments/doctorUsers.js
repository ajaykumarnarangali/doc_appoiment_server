const APIError = require('../../shared/error/APIError');
const appointmentService = require('../../services/appointment/index');
exports.doctorUsers = async (req, res, next) => {
    if (!req.user) {
        return next(new APIError(401, 'Authentication required'));
    }
    const { id } = req.user;
    try {
        const appointments = await appointmentService.doctorUsers(id);
        res.status(200).json({
            success: true,
            message: 'appointment taken user details fetched successfully',
            appointments
        })
    } catch (error) {
        next(error);
    }
}