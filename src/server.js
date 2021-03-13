'use strict';

const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./auth/auth-router.js');
const notFound = require('./middleware/404.js');
const serverError = require('./middleware/500.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRouter);
app.use('*', notFound);
app.use(serverError);

module.exports = {
  server: app,
  start: (port) => {
    mongoose.connect('mongodb://localhost:27017/basic-auth', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      app.listen(port, () => console.log(`server is up on port: ${port}`))
    })
    .catch((err) => console.error('Could not start server ', err.message));
  },
};
