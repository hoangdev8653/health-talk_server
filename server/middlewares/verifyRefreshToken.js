const jwt = require("jsonwebtoken");

const verifyRefreshToken = (refreshToken) => {
  console.log("Verifying refresh token...", refreshToken);

  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, process.env.SECRET_KEY, (err, payload) => {
      if (err) {
        console.log("Error: ", err);
        reject(err);
      } else {
        resolve(payload);
      }
    });
  });
};

module.exports = verifyRefreshToken;
