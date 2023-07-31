const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
require('dotenv').config();


const jwtMiddleware = async (req, res, next) => {
    // JWT verification middleware
    // Get the token from the request headers
    // const token = req.headers.authorization?.split(' ')[1];
    console.log();
    const token = req.headers.authorization?.split(' ')[1]
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    // Verify the token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
      }
  
      // Store the decoded token in the request object
      req.user = decoded;
      next();
    });
};


const jwtAdminMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    // Verify the token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
      }
  
      // Store the decoded token in the request object
      user = decoded;

      userRole = user.role

      if(userRole !== `admin`) return res.status(403).json({ message: 'please enter an admin account' });
      next();
    });
}

module.exports = {
    jwtMiddleware,
    jwtAdminMiddleware
};