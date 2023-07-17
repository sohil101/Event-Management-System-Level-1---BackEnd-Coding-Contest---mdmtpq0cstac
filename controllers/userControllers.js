const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Registering user into the database and hashing user password
const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;

    // Check if the password matches the confirmpassword
    if (password !== confirmpassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object with hashed password and save it to the database
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Remove password from the user object before sending the response
    newUser.password = undefined;

    // Respond with the created user object
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Checking if the user exists and logging in
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the password matches the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JSON Web Token (JWT) for the user
    const token = jwt.sign({ _id: user._id }, 'your_secret_key_here', { expiresIn: '1h' });

    // Respond with the JWT token
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Updating Password
const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;

    // Check if the user exists in the database
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the provided email matches the email in the database for the corresponding user ID
    if (user.email !== email) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    // Hash the new password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password in the database
    await User.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });

    // Remove password from the user object before sending the response
    user.password = undefined;

    // Respond with the updated user object
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { registerUser, loginUser, updatePassword };
