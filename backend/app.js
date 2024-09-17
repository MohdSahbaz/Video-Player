const express = require("express");
const cors = require("cors");
const app = express();

const connectDB = require("./config/connectDB");
const videoRoutes = require("./routes/videos");
const userAuthRoutes = require("./routes/userAuth");
const passRoutes = require("./routes/forgetPassword");
const userRoutes = require("./routes/user");
const followRoutes = require("./routes/following");

require("dotenv").config();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Hello");
});

// Video route
app.use("/api", videoRoutes);

// User auth route
app.use("/api", userAuthRoutes);

// Forget or change password route
app.use("/api/password", passRoutes);

// User routes
app.use("/api", userRoutes);

// Following Routes
app.use("/api", followRoutes);

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
