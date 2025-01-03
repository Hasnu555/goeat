
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUserService = async ({ name, email, password, location }) => {
  try {
    const user = await User.create({
      name,
      email,
      password,
      location,
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'defaultSecret');
    return { user, token };
  } catch (error) {
    throw new Error(error.message);
  }
};

const loginUserService = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid email or password');

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new Error('Invalid email or password');

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'defaultSecret');
    return { user, token };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { registerUserService, loginUserService };
