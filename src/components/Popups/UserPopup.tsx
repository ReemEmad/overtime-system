import * as React from "react";
import {
  Dispatch,
  SetStateAction,
  useState,
  forwardRef,
  useEffect,
} from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {
  usePostUserMutation,
  useUpdateUserMutation,
} from "../../services/user.service";
import useAlert from "../Alerts/useAlert";
import { MenuItem, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Save } from "@mui/icons-material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { userDataDto } from "../../data/DTO/User";

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

export default function UserPopup(props: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  add?: boolean;
  edit?: boolean;
  user?: userDataDto;
}) {
  const { open, setOpen, add = false, edit = false, user } = props;

  const [AlertComponent, showAlert] = useAlert();

  const [username, setusername] = useState(add ? "" : user?.name);
  const [userTitle, setuserTitle] = useState(add ? "" : user?.work_title);
  const [userPhone, setuserPhone] = useState(add ? "" : user?.phone);
  const [userWorkLocation, setuserWorkLocation] = useState(
    add ? "" : user?.work_location
  );
  const [userRole, setuserRole] = useState(add ? "" : user?.role_name);
  const [userEmail, setuserEmail] = useState(add ? "" : user?.email);
  const [userPassword, setuserPassword] = useState(add ? "" : user?.password);
  const [openSuccess, setopenSuccess] = useState(false);

  const [postUser, postUserRes] = usePostUserMutation();
  const [updateUser, updateUserRes] = useUpdateUserMutation();
  const [errorMessages, seterrorMessages] = useState([]);
  const [offices, setoffices] = useState([]);

  useEffect(() => {
    const constants = JSON.parse(localStorage.getItem("constants")!);
    setoffices(constants?.offices);
  }, []);

  const handleClose = () => setOpen(false);

  const setModalTitle = () => {
    if (add) return "Add a new user";
    return "Edit User Data";
  };

  const selectuserRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setuserRole((event.target as HTMLInputElement).value);
  };

  const postNewUser = () => {
    postUser({
      name: username,
      work_title: userTitle,
      phone: userPhone,
      work_location: userWorkLocation,
      email: userEmail,
      password: userPassword,
      role_name: userRole,
    });
  };

  const editUser = () => {
    updateUser({
      id: user?.id,
      body: {
        id: user?.id,
        name: username ?? "",
        phone: userPhone ?? "",
        work_location: userWorkLocation ?? "",
        work_title: userTitle ?? "",
        email: userEmail ?? "",
        password: userPassword ?? "",
        role_name: userRole ?? "",
      },
    });
  };

  const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleCloseModal = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setopenSuccess(false);
  };

  useEffect(() => {
    if (postUserRes.isSuccess) {
      showAlert([postUserRes.data.messages[0].message], "success");
      handleClose();
    }
    if (postUserRes.isError) {
      const errorRes: any = postUserRes.error;
      let data: any = [...errorMessages];
      errorRes.data.messages.map((message: any) => data.push(message.message));
      seterrorMessages(data);
      showAlert([data.join(" ")], "error");
      seterrorMessages([]);
    }
  }, [postUserRes.isSuccess, postUserRes.isError]);

  useEffect(() => {
    if (updateUserRes.isSuccess) {
      const res: any = updateUserRes?.data;
      showAlert([res.messages[0].message], "success");
      handleClose();
    }
  }, [updateUserRes.isSuccess]);

  useEffect(() => {
    if (updateUserRes.isError) {
      const errorRes: any = updateUserRes.error;
      let data: any = [...errorMessages];
      errorRes.data.messages.map((message: any) => data.push(message.message));
      seterrorMessages(data);
      showAlert([data.join(" ")], "error");
      seterrorMessages([]);
    }
  }, [updateUserRes.isError]);

  return (
    <div>
      <Snackbar
        open={openSuccess}
        autoHideDuration={2000}
        onClose={handleCloseModal}
      >
        <Alert
          onClose={handleCloseModal}
          severity="success"
          sx={{ width: "100%" }}
        >
          {add ? "User added successfully" : "User edited successfully"}
        </Alert>
      </Snackbar>
      <AlertComponent />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box sx={{ mb: 2 }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {setModalTitle()}
              </Typography>
            </Box>
            <Box sx={{ ml: "21%" }}>
              <TextField
                id="filled-basic"
                label="Name"
                variant="filled"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label="Title"
                variant="filled"
                value={userTitle}
                onChange={(e) => setuserTitle(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label="Email"
                variant="filled"
                value={userEmail}
                onChange={(e) => setuserEmail(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label="Password"
                variant="filled"
                type="password"
                value={userPassword}
                onChange={(e) => setuserPassword(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label="Phone"
                variant="filled"
                value={userPhone}
                onChange={(e) => setuserPhone(e.target.value)}
              />
              <br />
              <TextField
                name="work_location"
                id="filled-select-currency"
                select
                label="Select work location"
                defaultValue=""
                variant="filled"
                value={userWorkLocation}
                onChange={(e) => setuserWorkLocation(e.target.value)}
                sx={{ width: "69%" }}
              >
                {offices.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <br />
              <FormControl sx={{ mt: 2 }}>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Role
                </FormLabel>
                <RadioGroup
                  value={userRole}
                  onChange={selectuserRole}
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="cfo"
                    control={<Radio />}
                    label="Cfo"
                    color="red"
                  />
                  <FormControlLabel
                    value="squadlead"
                    control={<Radio />}
                    label="Squad lead"
                    color="black"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <br />
            {add && (
              <Box sx={{ mt: 3, pr: 1 }}>
                <LoadingButton
                  loading={postUserRes.isLoading}
                  loadingPosition="start"
                  startIcon={postUserRes.isLoading ? <Save /> : null}
                  variant="contained"
                  onClick={postNewUser}
                >
                  Ok
                </LoadingButton>
              </Box>
            )}
            {edit && (
              <Box sx={{ mt: 3, pr: 1 }}>
                <LoadingButton
                  loading={updateUserRes.isLoading}
                  loadingPosition="start"
                  startIcon={updateUserRes.isLoading ? <Save /> : null}
                  variant="contained"
                  onClick={editUser}
                >
                  Ok
                </LoadingButton>
              </Box>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
