const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue:
      "https://wallpapers.com/images/featured/cool-profile-pictures-4co57dtwk64fb7lv.jpg",
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  followers: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  following: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  videos: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

// // Synchronize only the User model with the database
// User.sync({ force: true })
//   .then(() => {
//     console.log("User table created!");
//   })
//   .catch((error) => {
//     console.error("Error creating User table:", error);
//   });

module.exports = User;
