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
import useAlert from "../components/Alerts/useAlert";
import src from "../assets/login.svg";

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
  const [AlertComponent, showAlert] = useAlert();
  const navigate = useNavigate();
  const [loginUser, loginUserRes] = useLoginUserMutation();
  const [userEmail, setuserEmail] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const [errorMessages, seterrorMessages] = useState([]);

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
        navigate(appRoutes.SQUADLEAD_LANDING);
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
      localStorage.setItem("userData", JSON.stringify(response.body));
      showAlert(["logged in successfully"], "success");
      checkUserRoleAndRedirect(response.body.role);
    } else if (loginUserRes.isError) {
      const errorRes: any = loginUserRes.error;
      let data: any = [...errorMessages];
      errorRes.data.messages.map((message: any) => data.push(message.message));
      seterrorMessages(data);
      showAlert([data.join(" ")], "error");
      seterrorMessages([]);
    }
  }, [loginUserRes.isSuccess, loginUserRes.isError]);

  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            // placeItems: "center",
            // justifyContent: "center",
            // gap: "40px",
            // margin: "auto",
            maxHeight: "100vh",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#effefd",
              height: "100vh",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              width: "50%",
              position: "relative",
            }}
          >
            <Box sx={{ padding: "1rem" }}>
              <img
                width="200px"
                src="https://social.engagedly.com/uploads/62f54b89-db72-4076-9499-3547c51de48a/62f54b89-db72-4076-9499-3547c51de48a/social/picture/file/4254624/reduced_Integrant-Brand-Logo-Colored-2020.png"
              />
            </Box>

            <img width="65%" src={src} />
          </Box>
          {/* <Divider orientation="vertical" /> */}

          <Box sx={{ marginLeft: "50px" }}>
            <Typography
              component="div"
              variant="h5"
              // textAlign="left"
              // color="GrayText"
              mb={3}
            >
              <Typography
                component="div"
                variant="h4"
                // textAlign="left"
                // color=""
                mb={3}
              >
                <Box sx={{ fontWeight: "bold" }}>Welcome Back!</Box>
              </Typography>
              Please sign in to your account
            </Typography>
            <Box>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                fullWidth
                value={userEmail}
                onChange={(e) => setuserEmail(e.target.value)}
              />
            </Box>
            <br />
            <Box>
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                fullWidth
                type="password"
                value={userPassword}
                onChange={(e) => setuserPassword(e.target.value)}
              />
            </Box>
            <br />
            <Button
              variant="contained"
              size="medium"
              onClick={confirmLogin}
              fullWidth
            >
              Login
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: "0px",
            marginY: "1rem",
            marginX: "1.5rem",
          }}
        >
          <Typography variant="body1" gutterBottom>
            &copy; All rights reserved 2023
          </Typography>
        </Box>
      </Box>
      <AlertComponent />
    </>
  );
}
