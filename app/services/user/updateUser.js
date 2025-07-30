const User = require('../../models/User');
const APIError = require('../../shared/error/APIError');

exports.updateUser = async (id, payLoad) => {

    const allowedKeys = ['username', 'email', 'phone', 'address', 'gender', 'dob'];
    const newData = {};
    const payLoadKeys = Object.keys(payLoad);
    payLoadKeys.forEach((key) => {
        if (payLoad[key] !== undefined && payLoad[key] !== '' && allowedKeys.includes(key)) {
            newData[key] = payLoad[key];
        }
    });

    const user = await User.findByIdAndUpdate(
        id,
        { $set: newData },
        { new: true, runValidators: true }
    );

    if (!user) {
        throw new APIError(404, 'User not found or update failed');
    }

    const { password: pass, verified: veri, ...rest } = user._doc;

    return rest;

}