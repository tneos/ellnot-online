const jwt = require("jsonwebtoken");
const config = require("config");

const auth = (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if token exists
  if (!token) {
    return res.status(401).json({msg: "No token provided, authorization denied"});
  }

  try {
    // Get payload
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({msg: "Token is not valid"});
  }
};

module.exports = auth;
