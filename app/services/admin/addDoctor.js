const User = require('../../models/User');
const APIError = require('../../shared/error/APIError');
const { cloudImageUpload } = require('../../utils/cloudImageupload');
const bcrypt = require('bcrypt');

exports.addDoctor = async (payLoad, imageFile) => {

    const doctor = await User.findOne({ email: payLoad?.email });
    if (doctor) {
        throw new APIError(409, 'User already exists with this email');
    }

    const [imageRes, hashRes] = await Promise.allSettled([
        cloudImageUpload(imageFile?.buffer),
        bcrypt.hash(payLoad?.password, 10)
    ]);

    const imageData = imageRes?.status === "fulfilled" ? { url: imageRes?.value?.secure_url, public_id: imageRes?.value?.public_id } : null;
    const hashedPassword = hashRes?.status === "fulfilled" ? hashRes?.value : null;

    if (!imageData || !hashedPassword) {
        throw new Error('Image upload or password hashing failed');
    }

    const newDoctor = new User({
        username: payLoad?.username,
        email: payLoad?.email,
        password: hashedPassword,
        experience: payLoad?.experience,
        fees: payLoad?.fees,
        about: payLoad?.about,
        speciality: payLoad?.speciality,
        degree: payLoad?.degree,
        address: payLoad?.address,
        verified: true,
        role: 'doctor',
        image: {
            url: imageData?.url,
            public_id: imageData?.public_id
        }
    })

    const result = await newDoctor.save();
    return result;
}