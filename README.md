# Video-Player

A full-featured video streaming platform built with the PERN stack (PostgreSQL, Express, React, Node.js). This project is an advanced step in my learning journey, incorporating key concepts of full-stack development.

## Features

- **Home Page:** Displays a feed of all available videos.
- **My Videos:** A personalized section where users can manage their uploaded videos.
- **Trending Videos:** Highlights popular and trending content.
- **Watch Later:** Users can save videos to watch at a later time.
- **Playlist:** Create and manage custom playlists.
- **My Followers:** View and interact with your followers.
- **User Profile:** Customize and manage your user profile.
- **Video Management:** Add, update, or delete videos with ease.
- **Additional Features:** Explore more interactive features designed to enhance the user experience.

## Technologies Used

- **PostgreSQL:** Database to store user data, video metadata, and other related information.
- **Express:** Backend framework for handling server-side logic and API routes.
- **React:** Frontend library for building an interactive and responsive user interface.
- **Node.js:** JavaScript runtime for executing server-side code and managing the application backend.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MohdSahbaz/Video-Player.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Video-Player
   ```
3. Install the backend dependencies:
   ```bash
   npm install
   ```
4. Set up your PostgreSQL connection in a `.env` file:
   ```bash
   SERVER_PORT = 3000
   DB_NAME = solkervideos
   DB_USER = user_name
   DB_PASSWORD = password
   DB_PORT = port of db
   USER_TOKEN = useyour token
   SALT_ROUNDS = 10
   EMAIL = email 
   EMAIL_PASSWORD = email_password / token
   ```
5. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```
6. Start the development server:
   ```bash
   cd ..
   npm run dev
   ```
7. Open your browser and navigate to `http://localhost:5173` to view the application.

8. 5. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
9. Start the development server:
   ```bash
   cd ..
   node app.js or nodemon start
   ```

## Usage

- **Home Page:** Browse all available videos on the platform.
- **My Videos:** Manage your uploaded videos, including editing and deleting content.
- **Trending:** Stay up-to-date with the most popular videos on the platform.
- **Watch Later:** Save videos for future viewing.
- **Playlists:** Organize your favorite videos into custom playlists.
- **User Profile:** Update your profile information and settings.

## Project Goals

- **Full-Stack Integration:** Apply the principles of PERN stack development to build a comprehensive web application.
- **User Experience:** Focus on creating a user-friendly interface with smooth navigation and interaction.
- **Scalability:** Develop a system that can handle multiple users, video uploads, and large amounts of data efficiently.

## Contributing

This project is part of my learning process, but contributions are welcome! If you have ideas or improvements, feel free to fork the repository and submit a pull request.

## License

This project is open-source and available under the [MIT License](LICENSE).
