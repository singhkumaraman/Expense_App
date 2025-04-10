const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token || !token.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    const check = token.split(" ");
    const decoded = jwt.verify(check[1], "aman", { algorithms: ["HS256"] });
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
module.exports = authMiddleware;
