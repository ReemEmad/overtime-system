import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AccountMenu from "./components/Menus/AccountMenu";
import AdminLanding from "./pages/AdminLanding";
import SideMenu from "./components/Menus/SideMenu";
import Signin from "./pages/Signin";
import Register from "./pages/Register";
{
  /* <SideMenu /> */
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Signin />} />
      <Route path="/landing" element={<SideMenu />}>
        <Route path="admin" element={<AdminLanding />} />
      </Route>
      <Route path="/candidate">
        <Route path="register" element={<Register />} />
      </Route>
    </>
  )
);
// { path: "/", element: <App />, errorElement: <p>something went wrong</p> },

function App() {
  return <RouterProvider router={router} />;
}

export default App;
