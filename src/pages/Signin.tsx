import * as React from "react";
import {
  Dispatch,
  SetStateAction,
  useState,
  forwardRef,
  useEffect,
} from "react";
import {
  Box,
  Modal,
  Fade,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Divider,
  TextField,
  Grid,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { LoadingButton } from "@mui/lab";
import SideMenu from "../components/Menus/SideMenu";

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

export default function Signin() {
  const [userEmail, setuserEmail] = useState("");
  const [userPassword, setuserPassword] = useState("");

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
          <Button variant="contained" size="medium" onClick={() => {}}>
            Login
          </Button>
        </Box>
      </Box>
    </>
  );
}
