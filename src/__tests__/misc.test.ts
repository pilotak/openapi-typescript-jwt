import request from 'supertest';
import { app } from '../app';

describe('Misc', () => {
  test('DOCS', async () => {
    const res = await request(app).get('/v1/docs');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('openapi');
  });

  test('Invalid URL', async () => {
    const res = await request(app).get('/test');
    expect(res.status).toBe(404);
  });
});
