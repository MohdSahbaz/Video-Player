import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { lazy, Suspense } from "react";

// Components
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
const Home = lazy(() => import("./components/home/Home"));
const Trending = lazy(() => import("./components/Videos/Trending"));
import SingleVideo from "./components/Videos/SingleVideo";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/Profile/EditProfile";

// Authentication check
const checkLogin = () => !!localStorage.getItem("authToken");

// Protected route components
const ProtectedRoute = ({ element }) => {
  return checkLogin() ? element : <Navigate to={"/login"} />;
};

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
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
            ),
          },
          {
            path: "watch",
            element: <SingleVideo />,
          },
          {
            path: "trending",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Trending />
              </Suspense>
            ),
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
        element: <ProtectedRoute element={<Profile />} />,
      },
      {
        path: "edit-profile",
        element: <ProtectedRoute element={<EditProfile />} />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
