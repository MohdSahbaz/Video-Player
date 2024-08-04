const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Video = sequelize.define("Video", {
  video_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  comments: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    allowNull: true,
  },
  upload_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  dislikes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  uploader_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  uploader_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// // Synchronize only the Video model with the database
// Video.sync()
//   .then(() => {
//     console.log("Video table created!");
//   })
//   .catch((error) => {
//     console.error("Error creating Video table:", error);
//   });

module.exports = Video;
