exports.TEST_NAME = "TEST CASE FOR REGISTER API"

exports.REQ_BODY = {
    userExist: {
        username: 'exists',
        email: 'userexist@gmail.com',
        role: 'user',
        password: 'exist@12345'
    }
}

exports.RESPONSES = {
    userExist: {
        status: 409,
        success: false,
        message: 'User already exists with this email'
    }
}

exports.TEST_CASES = {
    TEST_1: 'It shoud return error if email already exists'
}