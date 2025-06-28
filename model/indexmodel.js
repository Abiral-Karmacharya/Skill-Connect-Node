const user = require("./usermodel");
const role = require("./rolemodel");
const service = require("./servicemodel");
const servicename = require("./servicenamemodel");
const servicedescription = require("./servicedescriptionmodel");
const expert = require("./expertmodel");
const review = require("./reviewmodel");

role.hasOne(user, { foreignKey: "RoleID" });
servicename.hasOne(service, { foreignKey: "ServiceNameID" });
servicedescription.hasOne(service, { foreignKey: "ServiceDescriptionID" });
user.hasOne(service, { foreignKey: "UserID" });
user.hasOne(expert, { foreignKey: "UserID" });
expert.hasOne(service, { foreignKey: "ExpertID" });
user.hasOne(review, { foreignKey: "UserID" });
service.hasOne(review, { foreignKey: "ServiceID" });

module.exports = {
  user,
  role,
  service,
  servicename,
  servicedescription,
  expert,
};
