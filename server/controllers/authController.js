const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');


exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword =  bcryptjs.hashSync(password, 10);

    const newUser = await User.create({ name, email, password: hashedPassword });

    console.log(newUser._id.toString(), "...............userId");
    console.log("Signing Up");
    
    res.status(201).json({ user: newUser });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};




exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = bcryptjs.compareSync(password, user.password);
   
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ userId: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: "1day" }); 
    res.cookie('token', token, { httpOnly: true });

    console.log(typeof token,"typeeeeeeeeeeeeeeeeee on loginBE" );
 

    res.json({ user, token }); 
    console.log("Logging in");
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};




exports.logout = async (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie('token', { httpOnly: true, secure: true }); // 'secure: true' requires HTTPS
    
    res.status(200).json({ message: 'Logout successful' });
    console.log("Logged out");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};





