const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const sendEmail = require('../helpers/SendEmail')


// Register Controller
const registerUser = async (req, res) => {
  try {
    const { email, password, department } = req.body;

    // Check if user already exists
    const checkExistingUser = await User.findOne({ email });
    if (checkExistingUser) {
      return res.status(400).json({
        message: 'User with same email exists. Please try with a different one',
      });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Save the new user
    const newUser = new User({
      email,
      password: hashedPassword,
      department
    });

    await newUser.save();

    res.status(200).json({ message: 'User registered successfully!' });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong! Please try again' });
  }
};

// Login Controller
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        message: 'Invalid Credentials!' 
      });
    }

    // Compare password
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        message: 'Invalid Credentials!' 
      });
    }

    // Generate JWT
    const token = jwt.sign({ 
      userId: user._id,
      role: user.role,
      email:user.email,
      department : user.department
    }, process.env.JWT_SECRET_KEY, {
      expiresIn: '7d',
    });

    res.status(200).json({
      message: 'Login successful!',
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong! Please try again' });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'No user with this email' });

    const token = crypto.randomBytes(32).toString('hex');
    const expiration = Date.now() + 15*60*1000; // expires in 15 min

    user.resetToken = token;
    user.resetTokenExpiration = expiration;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    await sendEmail(
      email,
      'Password Reset Request',
      `<p>Click <a href="${resetUrl}">here</a> to reset your password.<br/> This link will expire in 15 minutes.</p>`
    );

    res.json({ message: 'Reset email sent' });
  } catch (err) {
    res.status(500).json({ message: 'Error sending reset email', error: err.message });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body; 

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: 'Reset link expired' });

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: 'Error resetting password', error: err.message });
  }
};

// Change Password Controller
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.userInfo.userId; 

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if old password matches
    const isMatch = await bcryptjs.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }

    // Hash new password
    const salt = await bcryptjs.genSalt(10);
    const hashedNewPassword = await bcryptjs.hash(newPassword, salt);

    // Update password
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
};

module.exports = {

  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  changePassword
}