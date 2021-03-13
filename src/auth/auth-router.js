'use strict';

const express = require('express');
const userModel = require('./models/users-model.js');
const basicAuth = require('./middleware/basic.js');

const authRouter = new express.Router();

authRouter.post('/signup', async (req, res) => {
  var user = new userModel(req.body);
  user.save((err, user) => {
    if (err) {
      res.status(403).send('Error creating user.');
    } else {
      res.status(201).json(user);
    }
  });
})

authRouter.post('/signin', basicAuth, (req, res) => {
  res.status(200).send(req.user);
});

module.exports = authRouter;
