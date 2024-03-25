const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  // Get the token from the request headers or cookies
  const token = req.headers.authorization;
  // console.log("token:", token);
  // console.log(typeof token);
  // console.log(req, res, "...........");

  // Verify the token
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
  const authToken = token.split(' ')[1];
  // Decode the token to get the user ID
  try {
    
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET); // Use JWT secret from environment variable
    req.userId = decoded.userId; 
    
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = authenticateUser;
