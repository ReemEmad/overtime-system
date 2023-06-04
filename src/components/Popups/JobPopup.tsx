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
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Save } from "@mui/icons-material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { JobDTO } from "../../data/DTO/Job";
import {
  usePostJobMutation,
  useUpdateJobMutation,
} from "../../services/job.service";

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

export default function JobPopup(props: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  add?: boolean;
  edit?: boolean;
  job?: JobDTO;
}) {
  const { open, setOpen, add = false, edit = false, job } = props;

  const [jobTitle, setjobTitle] = useState(add ? "" : job?.name);
  const [jobDescription, setjobDescription] = useState(
    add ? "" : job?.description
  );

  const [openSuccess, setopenSuccess] = useState(false);

  const [postJob, { isLoading, isSuccess }] = usePostJobMutation();
  const [updateJob, updateJobRes] = useUpdateJobMutation();

  const handleClose = () => setOpen(false);

  const setModalTitle = () => {
    if (add) return "Add a new job";
    return "Edit Job Data";
  };

  const postNewJob = () => {
    postJob({
      name: jobTitle,
      description: jobDescription,
    });
  };

  const editJob = () => {
    updateJob({
      id: job?.id,
      body: {
        name: jobTitle ?? "",
        description: jobDescription ?? "",
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
    if (isSuccess) {
      setopenSuccess(true);
      handleClose();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (updateJobRes.isSuccess) {
      setopenSuccess(true);
      handleClose();
    }
  }, [updateJobRes.isSuccess]);

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
          {add ? "Job added successfully" : "Job edited successfully"}
        </Alert>
      </Snackbar>
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
            <Box>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Name"
                variant="outlined"
                value={jobTitle}
                onChange={(e) => setjobTitle(e.target.value)}
              />
              <br />
              <br />
              <TextField
                fullWidth
                id="outlined-basic"
                label="Description"
                variant="outlined"
                value={jobDescription}
                onChange={(e) => setjobDescription(e.target.value)}
              />
            </Box>
            <br />
            {add && (
              <Box sx={{ mt: 3, textAlign: "right" }}>
                <LoadingButton
                  loading={isLoading}
                  loadingPosition="start"
                  startIcon={isLoading ? <Save /> : null}
                  variant="contained"
                  onClick={postNewJob}
                >
                  Ok
                </LoadingButton>
              </Box>
            )}
            {edit && (
              <Box sx={{ mt: 3, textAlign: "right" }}>
                <LoadingButton
                  loading={updateJobRes.isLoading}
                  loadingPosition="start"
                  startIcon={updateJobRes.isLoading ? <Save /> : null}
                  variant="contained"
                  onClick={editJob}
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
