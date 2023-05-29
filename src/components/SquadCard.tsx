import { useEffect, useState, forwardRef } from "react";
import src from "../assets/avatar-library/avatar-1.jpg";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Modal,
  TextField,
  CardActions,
  IconButton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Edit, Delete, Save } from "@mui/icons-material";
import { useDeleteUserMutation } from "../services/user.service";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import UserPopup from "./Popups/UserPopup";
import { userDataDto } from "../data/DTO/User";
import useAlert from "./Alerts/useAlert";
import { stringAvatar } from "../utils/utility";
import { useTheme } from "@mui/material/styles";

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

export default function SquadCard(props: { user: userDataDto }) {
  const theme = useTheme();
  const [AlertComponent, showAlert] = useAlert();
  const { id, name: appuser, work_title } = props.user;
  const [deleteUser, deleteUserRes] = useDeleteUserMutation();
  const [open, setOpen] = useState(false);

  const [openSuccess, setopenSuccess] = useState(false);
  const [openDelete, setopenDelete] = useState(false);

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

  const handleCloseDelete = () => setopenDelete(false);

  const handleOpen = () => setOpen(true);

  const removeUser = () => {
    deleteUser(id as string);
    handleCloseDelete();
  };

  useEffect(() => {
    if (deleteUserRes.isSuccess) {
      showAlert([deleteUserRes.data.messages[0].message], "success");
    }
    if (deleteUserRes.isError) {
      showAlert([deleteUserRes?.data?.messages[0].message], "error");
    }
  }, [deleteUserRes]);

  return (
    <>
      <AlertComponent />
      <Card>
        {/* <CardMedia
          component="img"
          sx={{ width: 100 }}
          image={src}
          alt="avatar"
        /> */}

        <CardContent>
          <Typography component="div" variant="h5" textAlign="left">
            {appuser}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            textAlign="left"
          >
            {work_title}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {/* <Box sx={{ display: "flex", alignItems: "left", pl: 1, pb: 1 }}> */}
          <IconButton aria-label="edit">
            <Edit
              color="primary"
              // sx={{ color: "primary" }}
              onClick={handleOpen}
            />
          </IconButton>
          <IconButton aria-label="delete">
            <Delete color="error" onClick={() => setopenDelete(true)} />
          </IconButton>
          {/* </Box> */}
        </CardActions>
      </Card>
      <UserPopup open={open} setOpen={setOpen} edit={true} user={props.user} />
      {/* //possible refactor */}
      {/* TODO://delete confirmation */}
      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete this user?
          </Typography>
          <br />
          <Box sx={{ mt: 3 }}>
            <LoadingButton
              loading={deleteUserRes.isLoading}
              loadingPosition="start"
              startIcon={deleteUserRes.isLoading ? <Save /> : null}
              variant="contained"
              onClick={removeUser}
              size="small"
            >
              Confirm
            </LoadingButton>
            <Button
              variant="contained"
              onClick={handleCloseDelete}
              sx={{ mx: 1 }}
              size="small"
              color="error"
            >
              Cancel
            </Button>
          </Box>
          <Box></Box>
        </Box>
      </Modal>
    </>
  );
}
