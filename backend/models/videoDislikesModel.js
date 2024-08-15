const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const VideoDislike = sequelize.define(
  "VideoDislike",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "user_id",
      },
      onDelete: "CASCADE",
    },
    videoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Videos",
        key: "video_id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["userId", "videoId"],
      },
    ],
  }
);

// VideoDislike.sync({ force: true })
//   .then(() => console.log("VideoLiked Table Created"))
//   .catch((error) => console.log("VideoLiked Table Not Created " + error));

module.exports = VideoDislike;
