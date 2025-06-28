const { DataTypes } = require("sequelize");

const { sequelize } = require("../database/db");

const ServiceNameModel = sequelize.define(
  "servicename",
  {
    ServiceNameID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ServiceName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tablename: "ServiceName",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = ServiceNameModel;
