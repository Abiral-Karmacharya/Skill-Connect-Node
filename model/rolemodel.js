const { DataTypes } = require("sequelize");

const { sequelize } = require("../database/db");

const RoleModel = sequelize.define(
  "Role",
  {
    RoleID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Role: {
      type: DataTypes.ENUM("admin", "user", "expert"),
      allowNull: false,
    },
  },
  {
    tableName: "Role",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = RoleModel;
