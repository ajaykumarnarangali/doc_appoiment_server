const APIError = require('../../shared/error/APIError');
const appointmentService = require('../../services/appointment/index');

exports.doctorAppointments = async (req, res, next) => {
    if (!req?.user.id) {
        next(new APIError(401, 'Authentication required'))
    }
    const { doctorId, date } = req.query;
    if (!doctorId || !date) {
        return next(new APIError(400, 'doctorId and date are required'));
    }
    try {
        const bookedSlots = await appointmentService.doctorAppointments(req.query);
        res.status(200).json({
            success: true,
            message: 'appointment details fetched successfully',
            bookedSlots
        })

    } catch (error) {
        console.log(error);
        next(error)
    }
}