const Appointment = require('../../models/Appointment');
const User = require('../../models/User');
const APIError = require('../../shared/error/APIError');

exports.doctorUsers = async (id) => {
    const user = await User.findById(id);
    if (!user) {
        throw new APIError(404, 'User not found');
    }

    const appointments = await Appointment.find({ doctorId: user?._id },'date status isPaymentComplete time').populate('userId', 'username image dob');

    return appointments || [];
}