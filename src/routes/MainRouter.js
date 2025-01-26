import { createBrowserRouter, RouterProvider } from "react-router-dom";

//component
import Home from "../pages/Home/Home";
import Favourite from "../pages/Favourite/Favourite";

//layout
import MainLayout from "../layout/MainLayout/MainLayout";
import NotFound from "../components/NotFound/NotFound";
import RecipeDetail from "../pages/RecipeDetail/RecipeDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/favourite",
        element: <Favourite />,
      },
      {
        path: "/recipe-details",
        element: <RecipeDetail />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
const MainRouter = () => {
  return <RouterProvider router={router} />;
};
export default MainRouter;
