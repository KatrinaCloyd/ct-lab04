const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

jest.mock('../lib/utils/twilio');
const twilio = require('../lib/utils/twilio');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('ct-lab04 routes', () => {
  beforeEach(() => {
    twilio.sendSms.mockReset();
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

  it('gets all users', async () => {
    await UserService.create({ userName: 'Bob', birthMonth: 'March' });
    const res = await request(app)
      .get('/api/v1/useradvice');
    expect(twilio.sendSms).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual([{
      id: expect.any(String),
      userName: expect.any(String),
      birthMonth: expect.any(String),
      advice: expect.any(String),
    }]);
  });

  it('gets user by id', async () => {
    await UserService.create({ userName: 'Bob', birthMonth: 'March' });
    const res = await request(app)
      .get('/api/v1/useradvice/1');
    expect(res.body).toEqual({
      id: '1',
      userName: 'Bob',
      birthMonth: 'March',
      advice: expect.any(String),
    });
  });

  it('deletes a user by id', async () => {
    await UserService.create({ userName: 'Bob', birthMonth: 'March' });
    const res = await request(app)
      .delete('/api/v1/useradvice/1');
    expect(res.body).toEqual({
      id: '1',
      userName: 'Bob',
      birthMonth: 'March',
      advice: expect.any(String),
    });
  });

  it('updates given users by id with new random advice', async () => {
    const firstUser = await UserService.create({ userName: 'Bob', birthMonth: 'March' });
    const res = await request(app)
      .put('/api/v1/useradvice/1');

    const isMatch = res.body.advice === firstUser.advice;
    console.log(res.body.advice);
    console.log(firstUser.advice);

    expect(res.body).toEqual({
      id: '1',
      userName: 'Bob',
      birthMonth: 'March',
      advice: expect.any(String),
    });
    expect(isMatch).toEqual(false);
    expect(twilio.sendSms).toHaveBeenCalledTimes(2);
  });

});
