const APIError = require('../../shared/error/APIError');
const adminService = require('../../services/admin/index');

exports.getDoctors = async (req, res, next) => {
    
    try {
        const doctors = await adminService.getDoctors();
        res.status(200).json({
            success: true,
            message: "doctor details fetched successfully",
            doctors
        })
    } catch (error) {
        next(error);
    }
}