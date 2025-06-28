const user = require("./usermodel");
const role = require("./rolemodel");

role.hasOne(user, { foreignKey: "RoleID" });

module.exports = {
  user,
  role,
};
