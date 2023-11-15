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
import Signout from "./pages/Signout";
import SquadLeadLanding from "./pages/SquadLeadLanding";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StyledEngineProvider } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import AdminPositions from "./pages/AdminPositions";
import CandidateSkills from "./pages/CandidateSkills";
import Profile from "./pages/Profile";
import ApprovedPositions from "./pages/ApprovedPositions";
import ApprovedJob from "./pages/ApprovedJob";
import { UserProvider } from "./context/UserProvider";
import CfoLanding from "./pages/CfoLanding";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Signin />} />
      <Route path="register" element={<Register />} />
      <Route path="/app-admin" element={<SideMenu />} errorElement={<Error />}>
        <Route path="landing" element={<AdminLanding />}></Route>
        <Route path="jobs" element={<Jobs />} />
        <Route path="skills" element={<Skills />} />
      </Route>
      <Route path="/candidate" errorElement={<Error />} element={<SideMenu />}>
        <Route path="skills" element={<CandidateSkills />} />
        <Route path="landing" element={<CandidateLanding />} />
        <Route path="signout" element={<Signout />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="/squadlead" errorElement={<Error />} element={<SideMenu />}>
        <Route path="landing" element={<SquadLeadLanding />} />
        <Route path="positions" element={<AdminPositions />} />
        <Route path="approved-positions" element={<ApprovedPositions />} />
        <Route path="approved-positions/:id" element={<ApprovedJob />} />
      </Route>
      <Route path="/cfo" errorElement={<Error />} element={<SideMenu />}>
        <Route path="landing" element={<CfoLanding />} />
      </Route>
      <Route path="*" element={<p>404 Not found...</p>} />
    </>
  )
);

function App(props: { children: any }) {
  const { children } = props;
  const { data, isSuccess } = useGetAppConstantsQuery({});

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("constants", JSON.stringify(data));
    }
  }, [isSuccess]);

  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <RouterProvider router={router} />
          {children}
        </LocalizationProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
