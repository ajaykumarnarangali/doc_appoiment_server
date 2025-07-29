const User = require('../../models/User');
const APIError = require('../../shared/error/APIError');
const { cloudImageUpload, deleteImage } = require('../../utils/cloudImageupload');


exports.profileImage = async (id, image) => {

    const user = await User.findById(id);

    if (!user) {
        throw new APIError(404, 'User does not exist');
    }

    if (user?.image?.public_id) {
        console.log(user?.image?.public_id);
        await deleteImage(user?.image?.public_id);
    }

    try {
        const { secure_url, public_id } = await cloudImageUpload(image.buffer);
        const newImage = {
            url: secure_url,
            public_id
        };
        const updatedUser = await User.findByIdAndUpdate(id,
            { $set: { image: newImage } },
            { new: true, runValidators: true }
        );
        const { password: pass, verified: veri, ...rest } = updatedUser._doc;
        return rest;
    } catch (error) {
        throw error;
    }
}