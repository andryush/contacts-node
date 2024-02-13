const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("Unauthenticated");
      }
      req.user = decoded;
      next();
    });
  }

  if (!token) {
    res.status(401);
    throw new Error("Unauthenticated or token not found");
  }
});

module.exports = validateToken;
