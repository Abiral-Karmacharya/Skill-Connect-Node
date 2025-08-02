const { DataTypes } = require("sequelize");

const { sequelize } = require("../database/db");

const reviewmodel = sequelize.define(
  "reviewmodel",
  {
    ReviewID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Rating: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    Comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CreatedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Review",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = reviewmodel;
