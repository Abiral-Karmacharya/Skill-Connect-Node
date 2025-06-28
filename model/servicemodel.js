const { DataTypes } = require("sequelize");

const { sequelize } = require("../database/db");

const ServiceModel = sequelize.define("Service", {
  ServiceID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  CreatedDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  AcceptedDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  CompletedDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});
