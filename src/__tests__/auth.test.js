const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

let server;
beforeAll(async () => {
    server = app.listen(5001); // Start the server on a different port for testing
});

afterAll(async () => {
    await mongoose.connection.close();
    server.close();
});

describe('Auth Routes', () => {
    let token;

    beforeEach(async () => {
        await User.deleteMany({});
        const user = new User({  name: "test", email: "testadminauth@gmail.com", password: 'testpass', role: 'admin' });
        await user.save();
    });

    it('should register a new user', async () => {
        const response = await request(server)
            .post('/auth/register')
            .send({  name: "test", email: "testadminauth1@gmail.com", password: 'testpass', password: 'newpass', role: 'user' });

        expect(response.status).toBe(201);
    });

    it('should login a user and return a token', async () => {
        const response = await request(server)
            .post('/auth/login')
            .send({ email: "testadminauth@gmail.com", password: 'testpass' });

        expect(response.status).toBe(200);
        expect(response.body.accessToken).toBeDefined();
        token = "BEarer "+ response.body.accessToken;
    });

    it('should not login with invalid credentials', async () => {
        const response = await request(server)
            .post('/auth/login')
            .set('Authorization', token)
            .send({  email: "testadminauth@gmail.com", password: 'wrongpass' });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid credentials');
    });
});
