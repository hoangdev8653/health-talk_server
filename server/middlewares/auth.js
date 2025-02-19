const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.slice(7);
    try {
      const decoded = await jwt.verify(
        token,
        process.env.SECRET_KEY || "secretkey"
      );
      req.userId = decoded.userId;
      next();
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        console.log("Token is InValid or has expired");
      }
      console.log("Error234: ", error.name);
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Token is Invalid or has expired" });
    }
  } else {
    console.error("User is not authorized or has expired");
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "User is not authorized or token is missing" });
  }
};
module.exports = validateToken;
