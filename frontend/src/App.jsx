import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { lazy, Suspense } from "react";

// Components
import Header from "./components/header/Header";
const Home = lazy(() => import("./components/home/Home"));
const Trending = lazy(() => import("./components/Videos/Trending"));
import SingleVideo from "./components/Videos/SingleVideo";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/Profile/EditProfile";
import UploadVideo from "./components/Videos/UploadVideo";
import ForgetPassword from "./components/auth/ForgetPassword";
import ChangePassword from "./components/auth/ChangePassword";
const UserVideos = lazy(() => import("./components/Videos/UserVideos"));
import VisitProfile from "./components/Profile/VisitProfile";

// Authentication check
const checkLogin = () => !!localStorage.getItem("authToken");

// Protected route components
const ProtectedRoute = ({ element }) => {
  return checkLogin() ? element : <Navigate to={"/login"} />;
};

const ProtectedRouteAuth = ({ element }) => {
  return !checkLogin() ? element : <Navigate to={"/profile"} />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
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
        path: "trending",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Trending />
          </Suspense>
        ),
      },
      {
        path: "watch",
        element: <SingleVideo />,
      },
      {
        path: "login",
        element: ProtectedRouteAuth(<Login />),
      },
      {
        path: "register",
        element: ProtectedRouteAuth(<Register />),
      },
      {
        path: "forgot-password",
        element: <ForgetPassword />,
      },
      {
        path: "change-password",
        element: <ChangePassword />,
      },
      {
        path: "profile",
        element: <ProtectedRoute element={<Profile />} />,
      },
      {
        path: "edit-profile",
        element: <ProtectedRoute element={<EditProfile />} />,
      },
      {
        path: "upload-video",
        element: <ProtectedRoute element={<UploadVideo />} />,
      },
      {
        path: "myvideo",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProtectedRoute element={<UserVideos />} />
          </Suspense>
        ),
      },
      {
        path: ":username",
        element: <VisitProfile />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
