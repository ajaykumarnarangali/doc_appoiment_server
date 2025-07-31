const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { Loader, app } = require('../../app/app');
const { TEST_NAME, TEST_CASES, REQ_BODY, RESPONSES } = require('./register.constant');
const { userAlreadyExist } = require('./register.mock');

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

});