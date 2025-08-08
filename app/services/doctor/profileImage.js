const User = require('../../models/User');
const APIError = require('../../shared/error/APIError');
const { cloudImageUpload, deleteImage } = require('../../utils/cloudImageupload');

exports.profileImage = async (id, image) => {
    const doctor = await User.findById(id);

    if (!doctor) {
        throw new APIError(404, 'User does not exist');
    }

    if (doctor?.image?.public_id) {
        await deleteImage(doctor?.image?.public_id);
    }

    try {
        const { secure_url, public_id } = await cloudImageUpload(image.buffer);
        const newImage = {
            url: secure_url,
            public_id
        };
        const updatedDoctor = await User.findByIdAndUpdate(id,
            { $set: { image: newImage } },
            { new: true, runValidators: true }
        );
        const { password: pass, verified: veri, ...rest } = updatedDoctor._doc;
        return rest;
    } catch (error) {
        throw error;
    }
}