const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

module.exports = function(user) {
  const payload = {
    username: user.username
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
};
