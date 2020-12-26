const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) next();
  else res.status(401).json("unAuthorized");
};

module.exports = checkAuth;
