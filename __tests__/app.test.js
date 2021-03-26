const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('ct-lab04 routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new user with auto generated advise', async () => {
    const res = await request(app)
      .post('/api/v1/useradvise')
      .send({ userName: 'Bob', birthMonth: 'March' });

    expect(res.body).toEqual({
      id: expect.any(Number),
      userName: expect.any(String),
      birthMonth: expect.any(String),
      advise: 'blah',
    });

  });
});
