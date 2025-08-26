/* eslint-disable no-undef */
const request = require('supertest');
const app = require('./index.js');

// Utility for external proxy tests
const TEST_URL = 'https://example.com';

describe('Ya Corps API', () => {
    describe('GET /', () => {
        it('should return greeting and endpoint info', async () => {
            const res = await request(app).get('/');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('success', true);
            expect(res.body).toHaveProperty('endpoints');
        });
    });

    describe('GET /request with missing url', () => {
        it('should return error for missing url', async () => {
            const res = await request(app).get('/request');
            expect(res.statusCode).toBe(999);
            expect(res.body).toHaveProperty('error', 'URL is required');
            expect(res.body).toHaveProperty('success', false);
        });
    });

    describe('GET /request with invalid url', () => {
        it('should return error for invalid url', async () => {
            const res = await request(app).get('/request?url=not-a-valid-url');
            expect(res.statusCode).toBe(999);
            expect(res.body).toHaveProperty('error', 'Invalid URL provided');
            expect(res.body).toHaveProperty('success', false);
        });
    });

    describe('POST /request with missing url', () => {
        it('should return error for missing url', async () => {
            const res = await request(app).post('/request').send({});
            expect(res.statusCode).toBe(999);
            expect(res.body).toHaveProperty('error', 'URL is required');
            expect(res.body).toHaveProperty('success', false);
        });
    });

    describe('POST /request with invalid url', () => {
        it('should return error for invalid url', async () => {
            const res = await request(app)
                .post('/request')
                .send({ url: 'not-a-valid-url' });
            expect(res.statusCode).toBe(999);
            expect(res.body).toHaveProperty('error', 'Invalid URL provided');
            expect(res.body).toHaveProperty('success', false);
        });
    });

    describe('GET /request with valid url', () => {
        it('should proxy GET request to example.com', async () => {
            const res = await request(app).get(
                `/request?url=${encodeURIComponent(TEST_URL)}`
            );
            expect(res.statusCode).toBe(200);
            expect(res.text).toContain('<title>Example Domain</title>');
        });
    });

    describe('POST /request with valid url', () => {
        it('should proxy POST request to example.com (should fallback to GET)', async () => {
            const res = await request(app)
                .post('/request')
                .send({ url: TEST_URL, method: 'GET' });
            expect(res.statusCode).toBe(200);
            expect(res.text).toContain('<title>Example Domain</title>');
        });
    });

    describe('GET /request with custom headers', () => {
        it('should proxy with custom User-Agent header', async () => {
            const headers = JSON.stringify({
                'User-Agent': 'ya-corps-test/1.0.0',
            });
            const res = await request(app).get(
                `/request?url=${encodeURIComponent(
                    TEST_URL
                )}&headers=${encodeURIComponent(headers)}`
            );
            expect(res.statusCode).toBe(200);
            expect(res.text).toContain('<title>Example Domain</title>');
        });
    });

    describe('POST /request with body', () => {
        it('should proxy POST request with body (to httpbin.org)', async () => {
            const res = await request(app)
                .post('/request')
                .send({
                    url: 'https://httpbin.org/post',
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: { test: 'value' },
                });
            expect(res.statusCode).toBe(200);
            let data;
            try {
                data = JSON.parse(res.text);
            } catch (e) {
                data = {};
            }
            expect(data).toHaveProperty('json');
            expect(data.json).toHaveProperty('test', 'value');
        });
    });

    describe('GET unknown route', () => {
        it('should return pirate 404', async () => {
            const res = await request(app).get('/unknown');
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('error');
            expect(res.body).toHaveProperty('success', false);
        });
    });
});
