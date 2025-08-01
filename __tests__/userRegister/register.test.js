const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { Loader, app } = require('../../app/app');
const { TEST_NAME, TEST_CASES, REQ_BODY, RESPONSES } = require('./register.constant');
const { userAlreadyExist, mockUserRegistrationSuccessFlow,
    mockUserRegistrationSendmailFail
} = require('./register.mock');

chai.use(chaiHttp);
const { expect } = chai;

describe(TEST_NAME, () => {
    before(async () => {
        await Loader();
    });
    afterEach(() => sinon.restore());

    it(TEST_CASES.TEST_1, async () => {
        userAlreadyExist(REQ_BODY.userExist);
        const res = await chai.request(app).post('/api/auth/register').send(REQ_BODY.userExist);
        expect(res).to.have.status(RESPONSES.userExist.status);
        expect(res.body.success).to.equal(RESPONSES.userExist.success);
        expect(res.body.message).to.equal(RESPONSES.userExist.message);
    })

    it(TEST_CASES.TEST_2, async () => {
        const res = await chai.request(app).post('/api/auth/register').send(REQ_BODY.InvalidPayload);
        expect(res).to.have.status(RESPONSES.SchemaValidationFails.status);
        expect(res.body.success).to.equal(RESPONSES.SchemaValidationFails.success);
        expect(res.body.message).to.equal(RESPONSES.SchemaValidationFails.message);
    })

    it(TEST_CASES.TEST_3, async () => {
        mockUserRegistrationSendmailFail();
        const res = await chai.request(app).post('/api/auth/register').send(REQ_BODY.mailFailPayload);
        expect(res).to.have.status(RESPONSES.sendMailFailCase.status);
        expect(res.body.success).to.equal(RESPONSES.sendMailFailCase.success);
        expect(res.body.message).to.equal(RESPONSES.sendMailFailCase.message);
    })

    it(TEST_CASES.TEST_4, async () => {
        mockUserRegistrationSuccessFlow()
        const res = await chai.request(app).post('/api/auth/register').send(REQ_BODY.validPayload);
        expect(res).to.have.status(RESPONSES.successResponse.status);
        expect(res.body.success).to.equal(RESPONSES.successResponse.success);
        expect(res.body.message).to.equal(RESPONSES.successResponse.message);
    })

});