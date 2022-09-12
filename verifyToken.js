const jwt = require("jsonwebtoken");
const { createError } = require("./error");

exports.verifyToken = async (req, res, next) => {
  const token = req.session.accessToken;
  if (!token) return next(createError(401, "You are not authorized."));

  jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
    if (err) return next(createError(403, "Token not valid"));
    req.user = user;
    next();
  });
};
