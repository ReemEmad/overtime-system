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
import Jobs from "./pages/Jobs";
import Skills from "./pages/Skills";
import Error from "./Error";
import CandidateLanding from "./pages/CandidateLanding";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Signin />} />
      <Route path="/landing" element={<SideMenu />} errorElement={<Error />}>
        <Route path="admin" element={<AdminLanding />}></Route>
        <Route path="jobs" element={<Jobs />} />
        <Route path="skills" element={<Skills />} />
      </Route>
      <Route path="/candidate">
        <Route path="register" element={<Register />} />
        <Route path="landing" element={<CandidateLanding />} />
      </Route>
      <Route path="*" element={<p>404 Not found...</p>} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
