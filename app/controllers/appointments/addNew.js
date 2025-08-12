const APIError = require('../../shared/error/APIError');
const appointmentSchema = require('../../validators/appointmentSchema');
const { validateWithSchema } = require('../../utils/schemaValidation');
const appoinmentService = require('../../services/appointment/index.js');
exports.newAppointment = async (req, res, next) => {
    try {
        if (!req.user) {
            return next(new APIError(401, "Authentication required"));
        }
        const { id } = req.user;

        const payLoad = req.body;
        if (!payLoad) {
            return next(new APIError(400, 'Request body is missing or malformed'));
        }

        const { error } = validateWithSchema(appointmentSchema, req.body);

        if (error) {
            return next(new APIError(400, error.details[0].message));
        }

        await appoinmentService.newAppointment(payLoad);

        res.status(201).json({
            success: true,
            message: "Appointment added successfully"
        })

    } catch (error) {
        next(error);
    }
}