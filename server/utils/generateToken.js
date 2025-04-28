const jwt = require("jsonwebtoken");

const generateToken = (userId, role) => {
  const accessToken = jwt.sign(
    { userId, role },
    process.env.SECRET_KEY || "secretkey",
    {
      expiresIn: "1d",
    }
  );
  const refreshToken = jwt.sign(
    { userId, role },
    process.env.SECRET_KEY || "secretkey",
    {
      expiresIn: "7d",
    }
  );
  return { accessToken, refreshToken };
};
module.exports = generateToken;
