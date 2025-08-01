const User = require('../../app/models/User');
const OTP = require('../../app/models/Otp');
const sinon = require('sinon');
const nodemailer = require('nodemailer');

exports.userAlreadyExist = (userExist) => {
    sinon.stub(User, 'findOne').resolves(userExist);
}

exports.mockUserRegistrationSendmailFail = () => {
    sinon.stub(User, 'findOne').resolves(null);
    sinon.stub(User.prototype, 'save').resolvesThis();
    sinon.stub(OTP.prototype, 'save').resolvesThis();
    sinon.stub(nodemailer, 'createTransport').returns({
        sendMail: sinon.stub().resolves({})
    });
}

exports.mockUserRegistrationSuccessFlow = () => {
    sinon.stub(User, 'findOne').resolves(null);
    sinon.stub(User.prototype, 'save').resolvesThis();
    sinon.stub(OTP.prototype, 'save').resolvesThis();
    sinon.stub(nodemailer, 'createTransport').returns({
        sendMail: sinon.stub().resolves({ messageId: '1234' })
    });
}