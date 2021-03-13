'use strict';

require('@code-fellows/supergoose');

const base64 = require('base-64');
const basicAuth = require('../src/auth/middleware/basic.js')
const testDB = require('../src/auth/models/users-model.js');

describe('BASIC AUTH middleware functionality', () => {

  let req = { headers: {authorization: ''} };
  let res = {};
  let next = jest.fn();

  const user = { "username": "JohnDoe", "password": "newPassword" };
  const validUser = base64.encode('JohnDoe:newPassword');
  const invalidUser = base64.encode('invalid:user');
  const invalidPassword = base64.encode(user.username + ':badpassword');
  let newUser = new testDB(user);

  beforeAll( async () => {
    await testDB.create(user);
  })

  beforeEach(() => {
    req = { headers: { authorization: ''} };
    res = {};
  })

  afterEach(() => {
    req = { headers: { authorization: '' }};
    res = {};
  })

  test('that is no username found will call next with an error', async () => {
    req.headers.authorization = invalidUser;
    await basicAuth(req, res, next);
    expect(next).toHaveBeenCalledWith({ message: 'No such user found'})
  })

})
