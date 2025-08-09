const APIError = require('../../shared/error/APIError');
const User = require('../../models/User');

exports.addLeave = async (id, payLoad) => {

    const doctor = await User.findOne({ _id: id });

    if (!doctor) {
        throw new APIError(404, 'User does not exist');
    }
    if (doctor && doctor.notAvailableDays.includes(payLoad.date)) {
        return doctor.notAvailableDays;
    }

    const doctorupdated = await User.findByIdAndUpdate(id, {
        $push: { notAvailableDays: payLoad?.date }
    }, {
        new: true
    });

    const Leaves = doctorupdated?.notAvailableDays;
    return Leaves;
}