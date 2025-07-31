const User = require('../../app/models/User');
const sinon = require('sinon');

exports.userAlreadyExist = (userExist) => {
    sinon.stub(User, 'findOne').resolves(userExist);
}