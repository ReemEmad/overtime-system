import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { useEffect, useState } from "react";
import AccountMenu from "./components/Menus/AccountMenu";
import AdminLanding from "./pages/AdminLanding";
import SideMenu from "./components/Menus/SideMenu";
import Signin from "./pages/Signin";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import Skills from "./pages/Skills";
import Error from "./Error";
import { useGetAppConstantsQuery } from "./services/app.service";
import CandidateLanding from "./pages/CandidateLanding";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Signin />} />
      <Route path="/app-admin" element={<SideMenu />} errorElement={<Error />}>
        <Route path="landing" element={<AdminLanding />}></Route>
        <Route path="jobs" element={<Jobs />} />
        <Route path="skills" element={<Skills />} />
      </Route>
      <Route path="/candidate" errorElement={<Error />}>
        <Route path="register" element={<Register />} />
        <Route path="landing" element={<CandidateLanding />} />
      </Route>
      <Route path="*" element={<p>404 Not found...</p>} />
    </>
  )
);

function App() {
  const { data, isSuccess } = useGetAppConstantsQuery({});

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("constants", JSON.stringify(data));
    }
  }, [isSuccess]);

  return <RouterProvider router={router} />;
}

export default App;
