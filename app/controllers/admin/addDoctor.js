const APIError = require('../../shared/error/APIError');
const doctorRegSchema = require('../../validators/doctorSchema');
const { validateWithSchema } = require('../../utils/schemaValidation');
const adminService = require('../../services/admin/index');

exports.addDoctor = async (req, res, next) => {
    req.body.working = JSON.parse(req.body.working);
    const { error } = validateWithSchema(doctorRegSchema, req.body);
    if (error) {
        return next(new APIError(400, error.details[0].message));
    }

    if (!req.file) {
        return next(new APIError(400, 'required image field'));
    }

    try {
        const doctor = await adminService.addDoctor(req.body, req.file);
        if (!doctor) {
            return next(new APIError(500, 'an error occured while registration'));
        }
        res.status(201).json({
            success: true,
            message: 'Doctor registered success fully'
        })

    } catch (error) {
        console.log(error);
        next(error)
    }
}