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
import NewJob from "./pages/NewJob";
import NewSkill from "./pages/NewSkill";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Signin />} />
      <Route path="/landing" element={<SideMenu />}>
        <Route path="admin" element={<AdminLanding />}></Route>
        <Route path="jobs" element={<NewJob />} />
        <Route path="skills" element={<NewSkill />} />
      </Route>
      <Route path="/candidate">
        <Route path="register" element={<Register />} />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
