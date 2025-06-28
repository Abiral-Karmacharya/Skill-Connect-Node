const { DataTypes } = require("sequelize");

const { sequelize } = require("../database/db");

const ExpertModel = sequelize.define(
  "expertmodel",
  {
    ExpertID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    tableName: "Expert",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = ExpertModel;
