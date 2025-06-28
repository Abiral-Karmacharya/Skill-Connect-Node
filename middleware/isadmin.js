const isAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.user && req.user.role == "admin") {
    next();
  }
  res.status(403).json({
    success: false,
    message: "Access denied: admins only",
  });
};

module.exports = isAdmin;   
