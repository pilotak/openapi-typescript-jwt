import request from 'supertest';
import { app } from '../app';

describe('Misc', () => {
  test('Custom route', async () => {
    const res = await request(app).get('/v1/test');
    expect(res.status).toBe(200);
  });

  test('DOCS', async () => {
    const res = await request(app).get('/v1/docs');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('openapi');
  });
});
