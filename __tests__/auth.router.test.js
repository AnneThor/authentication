'use strict';

require('@code-fellows/supergoose');

const supertest = require('supertest');
const userRoutes = require('../src/auth/auth-router.js');

const testDB = require('../src/auth/models/users-model.js');
const server = require('../src/server.js').server;
const mockRequest = supertest(server);
const base64 = require('base-64');

describe('USER ROUTES functionality', () => {

  const userArray = [{ username: "Jane Doe", password: '12345' },
                     { username: "John Doe", password: '54321' },
                     { username: "James Dean", password: '98765' }];

  const validUser = base64.encode(userArray[0].username + ":" + userArray[0].password);
  const invalidUser = base64.encode('invalid:user');
  const invalidPassword = base64.encode(userArray[0] + ':badpassword');

  //pre populate database with three users
  beforeEach(() => {
    userArray.forEach(user => {
      let newUser = new testDB(user);
      newUser.save();
    })
  });

  afterEach(() => {
    return testDB.deleteMany({});
  });

  it('should return a 404 on a bad method', async () => {
    await mockRequest.post('/singin')
      .then(reply => {
        expect(reply.status).toBe(404);
      });
  });

  it('should return 404 on a bad route', async () => {
    await mockRequest.get('/unknown-route')
      .then(reply => {
        expect(reply.status).toBe(404);
      })
  });

  test('that POST /signin sign in works for a valid user', async () => {
    await mockRequest.post('/signin').set({"Authorization": validUser})
      .then(reply => {
        expect(reply.status).toBe(200);
        expect(reply.body.username).toBe('Jane Doe');
        expect(reply.body.password).not.toBe('12345');
      })
  })

  test('that POST /signin sign does not work for an invalid user', async () => {
    await mockRequest.post('/signin').set({ "Authorization": invalidUser })
      .then(reply => {
        expect(reply.status).toBe(500);
      })
  })

  test('that POST /signin sign does not work for an valid user, invalid password combo', async () => {
    await mockRequest.post('/signin').set({ "Authorization": invalidPassword })
      .then(reply => {
        expect(reply.status).toBe(500);
      })
  })

  test('that POST /signup should return a newly created database entry', async () => {
    await mockRequest.post('/signup').send({"username": "newUser", "password": "newPassword"})
      .then(reply => {
        expect(reply.status).toBe(201);
        expect(reply.body.username).toEqual("newUser");
        expect(reply.body.password).not.toEqual("newPassword");
      });
  });


})
