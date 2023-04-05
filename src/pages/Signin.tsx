import * as React from "react";
import {
  Dispatch,
  SetStateAction,
  useState,
  forwardRef,
  useEffect,
} from "react";
import { Box, Button, Typography, Divider, TextField } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { LoadingButton } from "@mui/lab";
import SideMenu from "../components/Menus/SideMenu";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../services/auth.service";
import { AuthResponse } from "../data/DTO/AuthResponse";
import useAuthToken from "../hooks/useAuthToken";
import useAuthorization from "../hooks/useAuthorization";
import { UserRoles } from "../data/DTO/Roles";
import { appRoutes } from "../data/constants/appRoutes";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface userDTO {
  role: UserRoles;
  access_token: string;
  user: object;
}

export default function Signin() {
  const navigate = useNavigate();
  const [loginUser, loginUserRes] = useLoginUserMutation();
  const [userEmail, setuserEmail] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const { setAuthToken } = useAuthToken("");
  const [user, setUser] = useState<userDTO>();

  const confirmLogin = () => {
    loginUser({ email: userEmail, password: userPassword });
  };

  const checkUserRoleAndRedirect = (userRole: UserRoles) => {
    switch (userRole) {
      case UserRoles.Operation:
        navigate(appRoutes.CANDIDATE_LANDING);
        break;
      case UserRoles.CFO:
        navigate(appRoutes.ADMIN_LANDING);
        break;
      case UserRoles.SquadLead:
        navigate(appRoutes.ADMIN_LANDING);
        break;
      case UserRoles.Admin:
        navigate(appRoutes.ADMIN_LANDING);
        break;
      default:
        "";
        break;
    }
    return;
  };

  useEffect(() => {
    if (loginUserRes.isSuccess) {
      const response: any = loginUserRes.data;
      setUser(response);
      localStorage.setItem("userData", JSON.stringify(response));
      console.log(
        "🚀 ~ file: Signin.tsx:77 ~ useEffect ~ response.role:",
        response.role
      );
      checkUserRoleAndRedirect(response.role);
    }
  }, [loginUserRes]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          placeItems: "center",
          justifyContent: "center",
          gap: "40px",
          margin: "auto",
          height: "100vh",
        }}
      >
        <Box>
          <img
            width="400px"
            src="https://social.engagedly.com/uploads/62f54b89-db72-4076-9499-3547c51de48a/62f54b89-db72-4076-9499-3547c51de48a/social/picture/file/4254624/reduced_Integrant-Brand-Logo-Colored-2020.png"
          />
        </Box>
        <Divider orientation="vertical" />
        <Box>
          <Typography
            component="div"
            variant="h5"
            textAlign="left"
            color="GrayText"
            mb={3}
          >
            Please sign in to your account
          </Typography>
          <Box>
            <TextField
              id="filled-basic"
              label="Email"
              variant="filled"
              fullWidth
              value={userEmail}
              onChange={(e) => setuserEmail(e.target.value)}
            />
          </Box>
          <br />
          <Box>
            <TextField
              id="filled-basic"
              label="Password"
              variant="filled"
              fullWidth
              type="password"
              value={userPassword}
              onChange={(e) => setuserPassword(e.target.value)}
            />
          </Box>
          <br />
          <Button variant="contained" size="medium" onClick={confirmLogin}>
            Login
          </Button>
        </Box>
      </Box>
    </>
  );
}
