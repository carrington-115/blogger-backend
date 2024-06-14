const autoAuthRedirectMiddleware = (req, res, next) => {
  const user = req.user;
  if (user) res.redirect("/auth/profile");
  next();
};

module.exports = { autoAuthRedirectMiddleware };
