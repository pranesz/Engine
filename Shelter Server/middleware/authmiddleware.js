const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify the token and extract the userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);


    // Store userId directly on req object
    req.userId = decoded.user.id; // assuming the payload contains userId

    next(); // proceed to the next middleware/controller
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;




// middleware/authMiddleware.js

// const jwt = require("jsonwebtoken");

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['Authorization'];
//   const token = authHeader && authHeader.split(' ')[1]; // Get token from header

//   if (!token) return res.sendStatus(401); // Unauthorized

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//     if (err) return res.sendStatus(403); // Forbidden
//     req.userId = decoded.userId; // Attach userId to request object
//     next();
//   });
// };

// module.exports = { authenticateToken };
