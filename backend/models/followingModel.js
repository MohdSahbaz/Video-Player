const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Following = sequelize.define("Following", {
  following_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  follower_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users", // Name of the Users table
      key: "user_id",
    },
    onDelete: "CASCADE", // If a User is deleted, delete their WatchLater records
  },
  followed_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users", // Name of the User table
      key: "user_id",
    },
    onDelete: "CASCADE", // If a User is deleted, delete related following records
  },
});

// // Synchronize only the WatchLater model with the database
// Following.sync()
//   .then(() => {
//     console.log("Following table created!");
//   })
//   .catch((error) => {
//     console.error("Error creating Following table:", error);
//   });

module.exports = Following;
