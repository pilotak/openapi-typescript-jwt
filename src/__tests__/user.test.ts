import request from 'supertest';
import { app } from '../app';

describe('Users', () => {
  let token: string;

  test('Login', async () => {
    const res = await request(app).post('/v1/login').query({ username: 'test' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');

    token = res.body.token;
  });

  test('GET /me', async () => {
    const res = await request(app).get('/v1/me').set('Authorization', token);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('name');
  });
});
