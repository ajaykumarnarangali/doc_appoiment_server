const User = require('../../models/User');
const Otp = require('../../models/Otp');
const RefreshToken = require('../../models/RefreshToken');
const bcrypt = require('bcrypt');
const APIError = require('../../shared/error/APIError');
const { generateOtp, sendMail, compareOtp, generateToken, decodeToken, comparetoken } = require('../../utils/index');
const otpTemplate = require('../../shared/mailTemplates/otpTemplate');
const { OTP_VERIFICATION } = require('../../shared/constants/emailSubjects');

const registerUser = async ({ username, email, password, role }) => {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new APIError(409, 'User already exists with this email');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role,
        image: {
            url: '',
            public_id: ''
        }
    });

    const newOtp = new Otp({
        email,
        otp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    })

    await Promise.all([newUser.save(), newOtp.save()]);

    const mailInfo = await sendMail(email, OTP_VERIFICATION, otpTemplate(otp));
    return mailInfo
}

const verifyOtp = async (email, otp) => {

    const [user, userOtp] = await Promise.all([User.findOne({ email }), Otp.findOne({ email, otp })]);

    if (!user) {
        throw new APIError(404, 'User not found');
    }

    if (!userOtp || userOtp.expiresAt < new Date()) {
        throw new APIError(400, 'expired OTP');
    }

    const isOtpMatch = compareOtp(otp, userOtp);

    if (!isOtpMatch) {
        throw new APIError(400, 'Invalid OTP');
    }

    const access_token = generateToken(
        { id: user._id, role: user.role },
        process.env.ACCESS_SECRET,
        '30m'
    );

    const refresh_token = generateToken(
        { id: user._id, role: user.role },
        process.env.REFRESH_SECRET,
        '7d'
    );
    const newRefreshToken = new RefreshToken({
        userId: user?._id,
        token: refresh_token,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    })
    user.verified = true;
    await Promise.all([user.save(), userOtp.deleteOne(), newRefreshToken.save()]);


    return { access_token, refresh_token };
}

const loginUser = async ({ email, password }) => {

    const user = await User.findOne({ email });
    if (!user) {
        throw new APIError(401, 'invalid email')
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new APIError(401, 'incorrect password');
    }

    if (user.MFA_Enabled) {
        const otp = generateOtp();
        const newOtp = new Otp({
            email,
            otp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000)
        });
        await newOtp.save();
        const mailInfo = await sendMail(email, OTP_VERIFICATION, otpTemplate(otp));
        return { mailInfo, isOtpSent: true }
    }

    const access_token = generateToken(
        { id: user._id, role: user.role },
        process.env.ACCESS_SECRET,
        '30m'
    );

    const refresh_token = generateToken(
        { id: user._id, role: user.role },
        process.env.REFRESH_SECRET,
        '7d'
    );

    await RefreshToken.findOneAndUpdate(
        { userId: user._id },
        {
            token: refresh_token,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        },
        { upsert: true, new: true }
    );

    return { access_token, refresh_token, isOtpSent: false, userRole: user?.role };

}

const refreshToken = async (incoming_token) => {

    const { decoded, err } = decodeToken(incoming_token, process.env.REFRESH_SECRET);

    if (err) {
        throw new APIError(401, 'Invalid or expired refresh token');
    }

    const old_refresh_token = await RefreshToken.findOne({ userId: decoded?.id });

    if (!old_refresh_token) {
        throw new APIError(403, 'Refresh token not recognized');
    }

    const isMatch = comparetoken(incoming_token, old_refresh_token?.token);

    if (!isMatch || old_refresh_token.expiresAt < new Date()) {
        throw new APIError(403, 'Invalid or expired refresh token');
    }

    const new_access_token = generateToken(
        { id: decoded.id, role: decoded.role },
        process.env.ACCESS_SECRET,
        '30m'
    );

    const new_refresh_token = generateToken(
        { id: decoded.id, role: decoded.role },
        process.env.REFRESH_SECRET,
        '7d'
    );

    old_refresh_token.token = new_refresh_token;
    await old_refresh_token.save();

    return { new_access_token, new_refresh_token }
}

module.exports = {
    registerUser,
    loginUser,
    verifyOtp,
    refreshToken
}

