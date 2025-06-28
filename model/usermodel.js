const { DataTypes } = require("sequelize");

const { sequelize } = require("../database/db");

const UserModel = sequelize.define(
  "User",
  {
    UserID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "User",
    freezeTableName: true,
  }
);

module.exports = UserModel;
