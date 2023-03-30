const user = require("../models/user");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error("no header provided");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_TOP_SECRET);
    console.log(payload);
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    console.log(error.message || "authentication failed");
  }
};

module.exports = auth;
