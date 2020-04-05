import request from 'supertest';
import { server } from '@root/app';
import { auth } from '@configurations/application';
import jwt from 'jsonwebtoken';
import factories from '../factories';

describe('Route -> User', () => {
  let session = {};

  beforeEach(async () => {
    const { id, name, email } = await factories.create('User');
    const model = { id, name, email };

    session = {
      ...model,
      token: jwt.sign(model, auth.secret, {
        expiresIn: auth.expiration,
      }),
    };
  });

  describe('Show', () => {
    it('should return status "not authorized" when requested without a token', async () => {
      const { status } = await request(server).get('/users/1');
      expect(status).toBe(401);
    });

    it('should return status "OK" and the user when it was successfully found', async () => {
      const { id } = await factories.create('User');

      const { status, body } = await request(server)
        .delete(`/users/${id}`)
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(200);
      expect(body.id).toBe(id);
    });

    it('should return status "not found" and an error when it was not found', async () => {
      const { status, body } = await request(server)
        .delete(`/users/99999`)
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(404);
      expect(body).toHaveProperty('error');
    });
  });

  describe('Delete', () => {
    it('should return status "not authorized" when requested without a token', async () => {
      const { status } = await request(server).put('/users/1');
      expect(status).toBe(401);
    });

    it('should return status "OK" and the user when it is successfully deleted', async () => {
      const { id } = await factories.create('User');

      const { status, body } = await request(server)
        .delete(`/users/${id}`)
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(200);
      expect(body.id).toBe(id);
    });

    it('should return status "not found" and an error when the user was not found', async () => {
      const { id } = await factories.create('User');

      await request(server)
        .delete(`/users/${id}`)
        .set('Authorization', `bearer ${session.token}`);

      const { status, body } = await request(server)
        .delete(`/users/${id}`)
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(404);
      expect(body).toHaveProperty('error');
    });
  });

  describe('Update', () => {
    it('should return status "not authorized" when requested without a token', async () => {
      const { status } = await request(server).put('/users');
      expect(status).toBe(401);
    });

    it('should return status "bad request" and and error when trying to change the password and the mandatory field "modification" is not filled', async () => {
      const user = await factories.create('User');

      const update = {
        name: user.name,
        email: user.email,
        password: {
          current: user.password,
        },
      };

      const { status, body } = await request(server)
        .put(`/users/${user.id}`)
        .send(update)
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(400);
      expect(body).toHaveProperty('error');
    });

    it('should return status "bad request" and and error when trying to change the password and the mandatory field "confirmation" is not filled', async () => {
      const user = await factories.create('User');

      const update = {
        name: user.name,
        email: user.email,
        password: {
          current: user.password,
          modification: '@newEmail',
        },
      };

      const { status, body } = await request(server)
        .put(`/users/${user.id}`)
        .send(update)
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(400);
      expect(body).toHaveProperty('error');
    });

    it.skip('should return status "OK" and the user when it is successfully updated', async () => {
      const user = await factories.create('User');

      const update = {
        name: user.name,
        email: user.email,
        password: {
          current: user.password,
          modification: '@newEmail',
          confirmation: '@newEmail',
        },
      };

      const { status, body } = request(server)
        .put(`/users/${user.id}`)
        .send(update)
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(200);
      expect(body).toHaveProperty('id');
    });

    it('should return status "not found" and an error when the user was not found', async () => {
      const user = await factories.attrs('User');

      const update = {
        name: user.name,
        email: user.email,
      };

      const { status, body } = await request(server)
        .put('/users/9999')
        .send(update)
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(404);
      expect(body).toHaveProperty('error');
    });
  });

  describe('Store', () => {
    it('should return status "not authorized" when requested without a token', async () => {
      const { status } = await request(server).post('/users');
      expect(status).toBe(401);
    });

    it('should return status "created" and the user when it is successfully created', async () => {
      const user = await factories.attrs('User');

      const { status, body } = await request(server)
        .post('/users')
        .send(user)
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(201);
      expect(body).toHaveProperty('id');
    });

    it('should return "bad request" and an error when the e-mail is duplicated', async () => {
      const existent = await factories.create('User');
      const user = await factories.attrs('User', {
        email: existent.email,
      });

      const { status, body } = await request(server)
        .post('/users')
        .send(user)
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(400);
      expect(body).toHaveProperty('error');
    });

    it('should return status "bad request" and an error when the mandatory fields are not filled', async () => {
      const { status, body } = await request(server)
        .post('/users')
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(400);
      expect(body).toHaveProperty('error');
    });
  });

  describe('Index', () => {
    it('should return status "not authorized" when requested without a token', async () => {
      const { status } = await request(server).get('/users');
      expect(status).toBe(401);
    });

    it('should return status "OK" and a list of all users', async () => {
      await factories.createMany('User', 5);

      const { status, body } = await request(server)
        .get('/users')
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(200);
      expect(body.length).toBeGreaterThanOrEqual(5);
    });
  });
});
