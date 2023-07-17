//Complete the below User Model

var mongoose = require('mongoose');

var userSchema = mongoose.Schema(
  // Write a mongoose schema here which includes name-type:String,password-type:String, confirmpassword-type:String,
  //email-type:String
  //note: All the fields are required
  {}
);
const User = mongoose.model('User', userSchema);
module.exports = User;
