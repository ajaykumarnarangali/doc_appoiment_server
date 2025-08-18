const APIError = require('../../shared/error/APIError');
const appointmentService = require('../../services/appointment/index');
exports.userPayable = async (req, res, next) => {
    if (!req.user) {
        return next(new APIError(401, "authentication required"));
    }
    const { id } = req.user;
    try {
        const appointments = await appointmentService.userPayable(id);
        res.status(200).json({
            success: true,
            message: 'user payable appointments fetched successfully',
            appointments
        });
    } catch (error) {

    }
}