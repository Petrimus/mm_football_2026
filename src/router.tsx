import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import About from "./components/About";
import Leaderboard from "./components/Leaderboard";
import Matches from "./components/Matches";
import Player from "./components/Player";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // layout
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "matches",
        element: <Matches />,
      },     
      {
        path: "player/:name",
        element: <Player />,
      },
    ],
  },
]);