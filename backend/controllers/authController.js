const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { pool } = require('../config/db');
require('dotenv').config();

// Register a new user
exports.register = async (req, res) => {
  try {
    const { email, password, username, handle } = req.body;

    // Check if user already exists
    const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user
    const [userResult] = await pool.query(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hashedPassword]
    );
    const userId = userResult.insertId;

    // Insert profile
    await pool.query(
      'INSERT INTO profiles (user_id, username, handle) VALUES (?, ?, ?)',
      [userId, username, handle]
    );

    // Create JWT token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      refreshToken,
      user: { id: userId, email, username, handle }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const user = users[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Get profile
    const [profiles] = await pool.query('SELECT * FROM profiles WHERE user_id = ?', [user.id]);
    const profile = profiles[0];

    // Create JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });

    res.json({
      message: 'Login successful',
      token,
      refreshToken,
      user: { id: user.id, email: user.email, ...profile }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Logout (client-side token removal)
exports.logout = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

// Refresh token
exports.refreshToken = (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const newToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.json({ token: newToken });
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Forgot password (placeholder)
exports.forgotPassword = (req, res) => {
  res.json({ message: 'Forgot password endpoint' });
};

// Reset password (placeholder)
exports.resetPassword = (req, res) => {
  res.json({ message: 'Reset password endpoint' });
};
