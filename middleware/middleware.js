const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.authenticate = async (req, res, next) => {
  const token = req.headers.authorization;
  const { id } = req.body;
  if (!token) {
    return res.status(401).json({ message: "Missing authorization header" });
  }
  try {
    const decoded = jwt.verify(token, "mysecretkey");
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user || id != userId) {
      return res.status(404).json({ message: "Not authorized" });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
