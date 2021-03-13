const base64 = require('base-64');
const userModel = require('../models/users-model.js');

module.exports = async (req, res, next) => {
  //taking input of base64 encoded username:password and decoding, splitting into username, password variables
  let [username, inputPW] = base64.decode(req.headers.authorization.split(' ').pop()).split(':');
  let user = await userModel.findOne({ username: username }, function (err, user) {
    if (err) {
      next({ message: 'Database error' });
    }
    if (user === null) {
      next({ message: 'No such user found' });
    } else {
      //test if the password matches
      user.comparePassword(inputPW, function(err, valid) {
        if (err) {
          next({ message: 'Database error' });
        }
        else {
          if (valid) {
            req.user = user;
            next();
          }
          else {
            next({ message: 'Incorrect login credentials' });
          }
        }
      })
    }
  });
}
