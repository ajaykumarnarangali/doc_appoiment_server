const APIError = require('../../shared/error/APIError');
const User = require('../../models/User');

exports.getUser = async (id) => {
    const user = await User.findById(id);
    if (!user) {
        return next(new APIError(404, "user not found"));
    }
    const { password: pass, ...rest } = user._doc;
    return rest;
}