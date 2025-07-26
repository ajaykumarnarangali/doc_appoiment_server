const APIError = require('../../shared/error/APIError');
const User = require('../../models/User');

exports.getUser = async (id) => {

    const user = await User.findById(id);
    if (!user) {
        throw new APIError(403, "failed to fetch user details")
    }
    const { password: pass, _id: uid, ...rest } = user._doc;
    return rest;
}