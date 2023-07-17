const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Registering user into database and hashing password of a user
const registerUser = async (req, res) => {
  try {
    // 1) Hash the password of a user using bcrypt js
    // 2) Check if the confirmpassword matches the password
    // 3) check for existing user if the email id already exists than show a json message User already exists
    // 4) If the confirmpassword===password then store the document of a user
    // 5) If the confirmpassword!=password then status should be 400 with the message: Passwords do not match
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

//Checking if the user exists
const loginUser = async (req, res) => {
  try {
    // 1) For login user will provide email and password
    // 2) check if the user exists in the database
    // 3) Also check if the password matches with the hashed password of the database
    // 4) If user email exists and password matches with the db then show a json message Successful login
    // 5) If the user Data is incorrect show a json message Invalid credentials
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

//Updating Password
const updatePassword = async (req, res) => {
  try {
    // 1) Using req.params.id require that document id which password needs to be Updated
    // 2) Check if the email===req.body.email
    // 3) If the db email mathes the req.body.email than using findByIdAndUpdate update old password with the new password remember to hash password
    // 4) If the password updated successfully then show updated password as a result
    // 5) If the email is not valid then show res.send('Invalid email') with status 400
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { registerUser, loginUser, updatePassword };
