const APIError = require('../../shared/error/APIError');
const doctorService = require('../../services/doctor/index');

exports.searchDoctors = async (req, res, next) => {
    try {
        const doctors = await doctorService.searchDoctors(req.query);
        res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            doctors
        })
    } catch (error) {
        next(error);
    }
}