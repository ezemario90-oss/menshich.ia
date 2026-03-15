const request = require('supertest');
const app = require('../index');

describe('Admin endpoints', () => {
  it('GET /admin/products requiere autenticación', async () => {
    const res = await request(app).get('/admin/products');
    expect(res.status).toBe(401);
  });
});