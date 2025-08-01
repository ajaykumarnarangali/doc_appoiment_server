exports.TEST_NAME = "TEST CASE FOR REGISTER API"

exports.REQ_BODY = {
    userExist: {
        username: 'exists',
        email: 'userexist@gmail.com',
        role: 'user',
        password: 'exist@12345'
    },
    InvalidPayload: {
        username: 'testuser',
        email: ''
    },
    mailFailPayload: {
        username: 'Fail',
        email: 'fail@gmail.com',
        role: 'user',
        password: '123456'
    },
    validPayload: {
        username: 'Ajay',
        email: 'test@gmail.com',
        role: 'user',
        password: '123456'
    }
}

exports.RESPONSES = {
    userExist: {
        status: 409,
        success: false,
        message: 'User already exists with this email'
    },
    SchemaValidationFails: {
        status: 400,
        success: false,
        message: '"email" is not allowed to be empty'
    },
    sendMailFailCase: {
        status: 500,
        success: false,
        message: 'User registration successful. OTP dispatch to email failed.'
    },
    successResponse: {
        status: 201,
        success: true,
        message: 'User registered successfully. OTP sent to email.'
    }
}

exports.TEST_CASES = {
    TEST_1: 'TEST_CASE_1 (Negative)------->It shoud return error if email already exists',
    TEST_2: 'TEST_CASE_2 (Negative)------->It shoud return error when the request body fails schema validation',
    TEST_3: 'TEST_CASE_3 (Negative)------->It shoud return error when user registration completed and otp sending failed',
    TEST_4: 'TEST_CASE_4 (Positive)------->It shoud return success when user registration completed and otp sent successfully'
}