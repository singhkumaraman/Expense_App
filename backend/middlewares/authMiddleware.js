const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    // console.log(authHeader);
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    const decoded = jwt.verify(token, "aman", { algorithms: ["HS256"] });
    req.user = decoded;
    // console.log(decoded);
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
module.exports = authMiddleware;
