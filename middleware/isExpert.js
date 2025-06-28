const User = require("../model/usermodel");

const isAdmin = async (req, res, next) => {
  console.log(req.user.email);
  const user = await User.findOne({ where: { Email: req.user.email } });
  console.log(user.RoleID);
  if (user.RoleID == 3) {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: "Access denied: admins only",
  });
};

module.exports = isAdmin;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NTExMjAyNzUsImV4cCI6MTc1MTIwNjY3NX0.2t3DheHQZrbg6W6GKyIAAQOswDC1T0UeRMudXvf_B9o
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ1c2VyMWdtYWlsLmNvbSIsImlhdCI6MTc1MTEyMDM3NywiZXhwIjoxNzUxMjA2Nzc3fQ.gndG3WYHAVejKn3S6K-KBwNPCvTRTTZqASEWmoxnz9Y