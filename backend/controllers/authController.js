const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register User
exports.registerUser = async (req, res) => {
  //console.log("from register");
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ name, email, password });

    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Set user information in the session
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    res.status(200).json({ message: 'Registered successfully',ses:req.session.uses });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Login User
exports.loginUser = async (req, res) => {
  //console.log("from login");
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User not exist Or Incorrect mail' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Incorrect password' });
    }

    // Set user information in the session
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
await req.session.save((err) => {
  if (err) {
    console.error('Session save error:', err);
  }
});


    res.status(200).json({ message: 'Logged in successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Check Session
exports.checkSession = (req, res) => {
 // console.log('from check session');
  if (req.session && req.session.user) {
    return res.json({ isAuthenticated: true, user: req.session.user });
  } else {
    return res.status(401).json({ isAuthenticated: false });
  }
};

// log out
exports.logoutUser = (req, res) => {
  //console.log("from logout");
  
  req.session.destroy((err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: 'Failed to log out' });
    }
    
    // Clear session-related cookies
    res.clearCookie('connect.sid', { httpOnly: true, secure: true, sameSite: 'Strict' });
    
    res.status(200).json({ message: 'Logged out successfully' });
  });
};
