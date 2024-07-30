import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./components/home/Home";
import SingleVideo from "./components/Videos/SingleVideo";
import Trending from "./components/Videos/Trending";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Sidebar />
      </>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: ":videoId",
        element: <SingleVideo />,
      },
      {
        path: "trending",
        element: <Trending />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
