const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const WatchLater = sequelize.define("WatchLater", {
  watchlater_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users", // Name of the Users table
      key: "user_id",
    },
    onDelete: "CASCADE", // If a User is deleted, delete their WatchLater records
  },
  video_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Videos", // Name of the Videos table
      key: "video_id",
    },
    onDelete: "CASCADE", // If a Video is deleted, delete related WatchLater records
  },
  addedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// // Synchronize only the WatchLater model with the database
// WatchLater.sync()
//   .then(() => {
//     console.log("WatchLater table created!");
//   })
//   .catch((error) => {
//     console.error("Error creating WatchLater table:", error);
//   });

module.exports = WatchLater;
