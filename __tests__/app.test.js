const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { sendSms } = require('../lib/utils/twilio');

describe('ct-lab04 routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  beforeEach(() => {
  });

  it('creates a new user with auto generated advise', async () => {
    const res = await request(app)
      .post('/api/v1/useradvise')
      .send({ userName: 'Bob', birthMonth: 'March' });
    expect(res.body).toEqual({
      id: expect.any(String),
      user_name: expect.any(String),
      birth_month: expect.any(String),
      advise: expect.any(String),
    });

  });
});
