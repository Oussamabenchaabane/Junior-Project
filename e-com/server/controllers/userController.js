const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const userController = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      
      
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      
      const hashedPassword = await bcrypt.hash(password, 10);
      
      
      await User.create({
        username,
        email,
        password: hashedPassword
      });

      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

    
      // const token = jwt.sign(
      //   { id: user.id, role: user.role },
      //   process.env.JWT_SECRET,
      //   { expiresIn: '1d' }
      // );

      // res.json({ token });
    } 
    catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = userController;
