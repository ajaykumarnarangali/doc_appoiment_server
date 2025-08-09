const APIError = require('../../shared/error/APIError');
const doctorService = require('../../services/doctor/index');

exports.addLeave = async (req, res, next) => {
    if (!req?.user.id) {
        next(new APIError(401, 'Authentication required'))
    }
    const { id } = req.user;
    const payLoad = req.body;
    if (!payLoad) {
        return next(new APIError(400, 'Request body is missing or malformed'));
    }
    try {
        const Leaves = await doctorService.addLeave(id, payLoad);
        res.status(200).json({
            success: true,
            message: 'leave added successfully',
            Leaves: Leaves
        })
    } catch (error) {
        next(error)
    }
}
