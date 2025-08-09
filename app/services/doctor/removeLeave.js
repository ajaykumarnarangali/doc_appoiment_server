const APIError = require('../../shared/error/APIError');
const User = require('../../models/User');

exports.removeLeave = async (id, payLoad) => {

    const doctor = await User.findOne({ _id: id });

    if (!doctor) {
        throw new APIError(404, 'User does not exist');
    }

    const doctorupdated = await User.findByIdAndUpdate(id, {
        $pull: { notAvailableDays: payLoad?.date }
    }, {
        new: true
    });

    const Leaves = doctorupdated?.notAvailableDays;
    return Leaves;
}