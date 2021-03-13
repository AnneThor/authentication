const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  // email: { type: String },
  // fullname: { type: String },
  // role: { type: String, enum: ['admin', 'editor', 'writer', 'user'], default: 'user' },
})

UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 5);
  next();
});

UserSchema.methods.comparePassword = function(inputPW, callback) {
  bcrypt.compare(inputPW, this.password, function(err, valid) {
    if (err) return callback(err);
    callback(null, valid);
  })
}


module.exports = mongoose.model('users', UserSchema);
