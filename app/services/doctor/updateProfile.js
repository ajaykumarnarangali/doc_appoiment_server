const User = require('../../models/User');
const APIError = require('../../shared/error/APIError');

exports.updateProfile = async (id, payLoad) => {

    const allowedKeys = ['username', 'about', 'fees', 'address',];
    const newData = {};
    const payLoadKeys = Object.keys(payLoad);
    payLoadKeys.forEach((key) => {
        if (payLoad[key] !== undefined && payLoad[key] !== '' && allowedKeys.includes(key)) {
            newData[key] = payLoad[key];
        }
    });

    const doctor = await User.findByIdAndUpdate(
        id,
        { $set: newData },
        { new: true, runValidators: true }
    );

    if (!doctor) {
        throw new APIError(404, 'User not found or update failed');
    }

    const { password: pass, verified: veri, ...rest } = doctor._doc;

    return rest;
}