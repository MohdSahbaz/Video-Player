const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/connectDB");
const videoRoutes = require("./routes/videos");
const userRoutes = require("./routes/userAuth");

require("dotenv").config();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Video route
app.use("/api", videoRoutes);

// User auth route
app.use("/api", userRoutes);

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
