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
import { AddCircle, CleaningServices, Send } from "@mui/icons-material";

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

export default function Skills() {
  const [userEmail, setuserEmail] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          placeItems: "center",
          justifyContent: "center",
          gap: "10px",
          margin: "auto",
          //   height: "100vh",
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddCircle />}
          size="medium"
          onClick={() => setOpen(true)}
        >
          Add a skill
        </Button>
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box sx={{ mb: 2 }}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                color="ButtonFace"
              >
                Add a new skill
              </Typography>
            </Box>
            <Box sx={{ ml: "21%" }}>
              <TextField
                id="filled-basic"
                label="Title"
                variant="filled"
                // value={username}
                // onChange={(e) => setusername(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label="Description"
                variant="filled"
                // value={userTitle}
                // onChange={(e) => setuserTitle(e.target.value)}
              />
              <Box sx={{ mt: 3, pr: 1 }}>
                <LoadingButton
                  //   loading={updateUserRes.isLoading}
                  loadingPosition="start"
                  //   startIcon={updateUserRes.isLoading ? <Save /> : null}
                  variant="contained"
                  //   onClick={editUser}
                >
                  Ok
                </LoadingButton>
              </Box>
            </Box>
            <br />
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
