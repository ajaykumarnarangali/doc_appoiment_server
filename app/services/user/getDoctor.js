const APIError = require('../../shared/error/APIError');
const User = require('../../models/User');

exports.getDoctor = async (docId) => {
    const doctor = await User.findOne({ _id: docId, role: 'doctor' });
    if (!doctor) {
        return next(new APIError(404, "user not found"));
    }
    const { password: pass, ...rest } = doctor._doc;
    return rest;
}