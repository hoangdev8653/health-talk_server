const jwt = require("jsonwebtoken");

const verifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      refreshToken,
      process.env.SECRET_KEY || "secretkey",
      (err, payload) => {
        if (err) {
          console.log("Error: ", err);
          reject(err);
        } else {
          resolve(payload);
        }
      }
    );
  });
};

module.exports = verifyRefreshToken;
