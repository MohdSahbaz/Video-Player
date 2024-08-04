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
  res.send(
    `<body style='background-color: black; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh;'>
      <h1 style='background-color: aqua; color: black; padding: 10px 20px; border-radius: 5px; margin-bottom: 20px;'>
        Find useful API, stupid!
      </h1>
      <button style='background-color: aqua; color: black; padding: 10px 20px; border: none; border-radius: 5px; margin: 10px; cursor: pointer;' onclick="window.location.href='/api/videos'">
        All Videos
      </button>
      <button style='background-color: aqua; color: black; padding: 10px 20px; border: none; border-radius: 5px; margin: 10px; cursor: pointer;' onclick="window.location.href='/api/trending'">
        Trending Videos
      </button>
      <button style='background-color: aqua; color: black; padding: 10px 20px; border: none; border-radius: 5px; margin: 10px; cursor: pointer;' onclick="window.location.href='/api/video/:id'">
        Get Video By Id
      </button>
    </body>`
  );
});

// Video route
app.use("/api", videoRoutes);

// User auth route
app.use("/api", userRoutes);

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
