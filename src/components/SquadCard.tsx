import { useEffect, useState, forwardRef } from "react";
import src from "../assets/avatar-library/avatar-1.jpg";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Edit, Delete, Save } from "@mui/icons-material";
import { useDeleteUserMutation } from "../services/user.service";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import UserPopup from "./Popups/UserPopup";
import { userDataDto } from "../data/DTO/User";

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
    if (deleteUserRes.isSuccess) {
      setopenSuccess(true);
      handleCloseDelete();
    }
  };

  return (
    <>
      {/* //TODO */}
      {/* <SuccessAlert open={isSuccess} /> */}
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
          User deleted successfully
        </Alert>
      </Snackbar>
      <Card sx={{ display: "flex", width: 300 }}>
        <CardMedia
          component="img"
          sx={{ width: 100 }}
          image={src}
          alt="avatar"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
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
          <Box sx={{ display: "flex", alignItems: "left", pl: 1, pb: 1 }}>
            <Edit color="info" onClick={handleOpen} />
            <Delete color="error" onClick={() => setopenDelete(true)} />
          </Box>
        </Box>
      </Card>
      <UserPopup open={open} setOpen={setOpen} edit={true} user={props.user} />
      {/* //possible refactor */}
      {/* //delete confirmation */}
      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color="ButtonFace"
          >
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
