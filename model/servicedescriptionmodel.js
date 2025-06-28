const { DataTypes } = require("sequelize");

const { sequelize } = require("../database/db");

const ServiceDescriptionModel = sequelize.define(
  "servicedescription",
  {
    ServiceDescriptionID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    ServiceDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "ServiceDescription",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = ServiceDescriptionModel;
