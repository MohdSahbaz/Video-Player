const sequelize = require("./db");

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database Connected");
  } catch (error) {
    console.log("Error while connecting database " + error.message);
  }
};

module.exports = connectDB;
