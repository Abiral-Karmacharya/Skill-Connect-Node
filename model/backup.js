const { DataTypes } = require("sequelize");

const { sequelize } = require("../database/db");

const ServiceModel = sequelize.define(
  "Service",
  {
    ServiceID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    CreatedDate: {
      type: DataTypes.DATE,
    },
    AcceptedDate: {
      type: DataTypes.DATE,
    },
    CompletedDate: {
      type: DataTypes.DATE,
    },
    Deadline: {
      type: DataTypes.DATE,
    },
    Price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    Status: {
      type: DataTypes.ENUM("pending", "accepted", "completed", "cancelled"),
      allowNull: false,
    },
  },
  {
    tableName: "Service",
    freezeTableName: false,
    timestamps: false,
  }
);

module.exports = ServiceModel;
