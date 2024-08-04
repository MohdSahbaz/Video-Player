import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./components/home/Home";
import SingleVideo from "./components/Videos/SingleVideo";
import Trending from "./components/Videos/Trending";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./components/Profile/Profile";

const checkLogin = localStorage.getItem("authToken");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        element: <Sidebar />,
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "watch",
            element: <SingleVideo />,
          },
          {
            path: "trending",
            element: <Trending />,
          },
        ],
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "profile",
        element: checkLogin ? <Profile /> : <Login />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
