const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/twilio');
const twilio = require('../lib/utils/twilio');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('ct-lab04 routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new user with auto generated advice', async () => {
    const res = await request(app)
      .post('/api/v1/useradvice')
      .send({ userName: 'Bob', birthMonth: 'March' });
    expect(twilio.sendSms).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual({
      id: expect.any(String),
      userName: expect.any(String),
      birthMonth: expect.any(String),
      advice: expect.any(String),
    });

  });
});
