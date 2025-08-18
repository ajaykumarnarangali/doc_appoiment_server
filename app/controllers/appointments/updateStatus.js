const APIError = require('../../shared/error/APIError');
const appointmentService = require('../../services/appointment/index');

exports.updateStatus = async (req, res, next) => {
    if (!req.user) {
        return next(new APIError(401, 'Authentication required'));
    }
    const payLoad = req.body;
    const { status } = payLoad;
    if (!status) {
        return next(new APIError(400, 'Request body is missing or malformed'));
    }
    const { id } = req.params;
    if (!id) {
        return next(new APIError(400, 'parameter is missing or malformed'));
    }
    try {
        const data = await appointmentService.updateStatus(id, payLoad);
        res.status(200).json({
            success: true,
            message: 'Appointment status update successfully',
            appointment: data
        })
    } catch (error) {
        next(error)
    }
}