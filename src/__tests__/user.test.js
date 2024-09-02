const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const mongoose = require('mongoose');

let server;
let token;
let userId;

beforeAll(async () => {
  server = app.listen(5002);
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

describe('User CRUD Routes', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = new User({ username: 'adminuser', name :"test", email:"adminuserad1234min@gmail.com", password: 'adminpass', role: 'admin' });
    await user.save();

    // Obtain token
    const response = await request(server)
      .post('/auth/login')
      .send({ email:"adminuserad1234min@gmail.com", password: 'adminpass' });
    token = "BEarer "+ response.body.accessToken;
    const newUser = new User({ username: 'testuser',  name :"test", email:"testuser1@gmail.com" ,password: 'testpass', role: 'user' });
    await newUser.save();
    userId = newUser._id;
  });

  it('should get all users (admin only)', async () => {
    const response = await request(server)
      .get('/users/')
      .set('Authorization', token);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should create a new user (admin only)', async () => {
    const response = await request(server)
      .post('/users/')
      .set('Authorization', token)
      .send({ username: 'newuser',  name :"test", email:"testuser19@gmail.com", password: 'newpass', role: 'user' });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('test');
  });

  it('should update a user (admin only)', async () => {
    const response = await request(server)
      .put(`/users/${userId}`)
      .set('Authorization', token)
      .send({ username: 'updateduser' });
    expect(response.status).toBe(200);
   
  });

  it('should delete a user (admin only)', async () => {
    const response = await request(server)
      .delete(`/users/${userId}`)
      .set('Authorization', token);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User deleted');
  });
});
