import request from 'supertest';
import { server } from '@root/App';
import { resolve } from 'path';

describe('Route -> Files', () => {
  describe('Store', () => {
    it('should return status "OK" when the file is successfully created and downloaded', async () => {
      const {
        body: { path },
      } = await request(server)
        .post('/files')
        .attach(
          'file',
          resolve(
            __dirname,
            'resources',
            '6723d50c676e8edbaf291b9ed64076e3.jpg'
          )
        );

      const { status, body } = await request(server).get(`/files/${path}`);

      expect(path).not.toBeNull();
      expect(status).toBe(200);
      expect(body).not.toBeNull();
    });
  });
});
