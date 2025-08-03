const { DataTypes } = require("sequelize");

const { sequelize } = require("../database/db");

// const ServiceModel = sequelize.define(
//   "Service",
//   {
//     ServiceID: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     CreatedDate: {
//       type: DataTypes.DATE,
//     },
//     AcceptedDate: {
//       type: DataTypes.DATE,
//     },
//     CompletedDate: {
//       type: DataTypes.DATE,
//     },
//     Deadline: {
//       type: DataTypes.DATE,
//     },
//     Price: {
//       type: DataTypes.DECIMAL(10, 2),
//       allowNull: false,
//     },
//     Status: {
//       type: DataTypes.ENUM("pending", "accepted", "completed", "cancelled"),
//       allowNull: false,
//     },
//   },
//   {
//     tableName: "Service",
//     freezeTableName: false,
//     timestamps: false,
//   }
// );

// module.exports = ServiceModel;

// servicemodel.js - Update your Service model to match your database columns

const service = sequelize.define(
  "Service",
  {
    ServiceID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Title: {
      // Make sure this matches your database column name
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      // Make sure this matches your database column name
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Requirements: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    CreatedDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "CreatedDate", // Maps to CreatedDate in database
    },
    // AcceptedDate: {
    //   type: DataTypes.DATE,
    //   allowNull: true,
    //   field: "AcceptedDate",
    // },
    // CompletedDate: {
    //   type: DataTypes.DATE,
    //   allowNull: true,
    //   field: "CompletedDate",
    // },
    Deadline: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    Price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    Status: {
      type: DataTypes.ENUM(
        "pending",
        "in-progress",
        "completed",
        "cancelled",
        "declined"
      ),
      defaultValue: "pending",
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User", // Assuming your User table name
        key: "UserID",
      },
    },
    ExpertID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Expert", // Assuming your Expert table name
        key: "ExpertID",
      },
    },
    // DeclineReason: {
    //   type: DataTypes.TEXT,
    //   allowNull: true,
    // },
  },
  {
    tableName: "Service", // Explicitly set table name
    timestamps: false, // Since you're using custom date fields
    // If you want to use Sequelize timestamps instead:
    // timestamps: true,
    // createdAt: 'CreatedDate',
    // updatedAt: 'UpdatedDate'
  }
);

module.exports = service;
