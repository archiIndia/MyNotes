import "./App.css";
import "@mantine/core/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./components/App";
import AllNotes from "./components/AllNotes";

function AppPage() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <div>Welcome To My Notes
            <img src="https://www.google.co.in/url?sa=i&url=https%3A%2F%2Fparade.com%2F1331806%2Fstephanieosmanski%2Ffacts-about-earth%2F&psig=AOvVaw3jTuVvyx5AXxg_kW9EPyqu&ust=1711376482364000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNChiq-MjYUDFQAAAAAdAAAAABAE"/>
          </div>
        },
        {
          path: "/notes",
          element: <AllNotes />,
        },
        {
          path: "/tags",
          element: <div>tags</div>,
        },
        {
          path: "/favourites",
          element: <div>favourites</div>,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default AppPage;
