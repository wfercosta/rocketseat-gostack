import request from 'supertest';
import { server } from '@root/App';
import factories from '../factories';

describe('Route -> Session', () => {
  let user;

  beforeAll(async () => {
    user = await factories.create('User');
  });

  it('should return status "bad request" when mandatory fields are not filled', async () => {
    const { status, body } = await request(server).post('/token');

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });

  it.skip('should return status "OK" and autentication token when the credentials was validated with success', async () => {
    const { email, password } = user;

    const { status, body } = await request(server).post('/token').send({
      email,
      password,
    });

    expect(status).toBe(200);
    expect(body).toHaveProperty('token');
  });

  it('should return status "not authorized" and an error when the credentials was validated with fail', async () => {
    const { email, password } = user;

    const { status, body } = await request(server)
      .post('/token')
      .send({ email, password: `${password}wrong` });

    expect(status).toBe(401);
    expect(body).toHaveProperty('error');
  });
});
