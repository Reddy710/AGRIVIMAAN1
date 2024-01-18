// Middleware to verify JWT token
const config = require('../config/config')
const jwt = require('jsonwebtoken');
const jwtSecret = config.jwt_secret_key; 

function verifyToken(req, res, next) {
  const token = req.headers['authorization']; 

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token is required.' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; 
    next(); 
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = verifyToken;