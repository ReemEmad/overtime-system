import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AdminLanding from "./pages/AdminLanding";
import "./index.css";

// const router = createBrowserRouter([
//   {
//     path: "/landing/admin",
//     element: <AdminLanding />,
//     loader: rootLoader,
//     children: [
//       {
//         path: "team",
//         element: <Team />,
//         loader: teamLoader,
//       },
//     ],
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <RouterProvider router={router} />
      <p>hello</p>
     */}
      <App />
    </Provider>
  </React.StrictMode>
);
