import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./components/home/Home";

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
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;