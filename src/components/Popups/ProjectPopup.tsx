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
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Add, Save } from "@mui/icons-material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import {
  usePostProjectsMutation,
  useEditProjectsMutation,
} from "../../services/positions.service";
import { projectDTO } from "../../data/DTO/Project";

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

export default function SkillPopup(props: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  edit?: boolean;
  add?: boolean;
  project?: projectDTO;
}) {
  const { open, setOpen, add = false, edit = false, project } = props;

  const [skillTitle, setskillTitle] = useState(add ? "" : project?.name);
  const [skillDescription, setskillDescription] = useState(
    add ? "" : project?.description
  );

  const [openSuccess, setopenSuccess] = useState(false);

  const [postProject, postProjectRes] = usePostProjectsMutation();
  const [updateProject, updateProjectRes] = useEditProjectsMutation();

  const handleClose = () => setOpen(false);

  const setModalTitle = () => {
    if (add) return "Add a new project";
    return "Edit project data";
  };

  const postNewProject = () => {
    postProject({
      name: skillTitle,
      description: skillDescription,
    });
  };

  // console.log("editing");
  // console.log(skillTitle, skillDescription, project?.id);
  // console.log(
  //   "🚀 ~ file: ProjectPopup.tsx:84 ~ editProject ~ body:",
  //   skillTitle,
  //   skillDescription
  // );
  const editProject = () => {
    updateProject({
      id: project?.id,
      name: skillTitle,
      description: skillDescription,
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
    if (postProjectRes.isSuccess) {
      setopenSuccess(true);
      handleClose();
    }
  }, [postProjectRes.isSuccess]);

  useEffect(() => {
    if (updateProjectRes.isSuccess) {
      setopenSuccess(true);
      handleClose();
    }
  }, [updateProjectRes.isSuccess]);

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
          {add ? "project added successfully" : "project edited successfully"}
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
                id="filled-basic"
                label="Name"
                variant="outlined"
                value={skillTitle}
                onChange={(e) => {
                  setskillTitle(e.target.value);
                  console.log(e.target.value);
                }}
              />
              <br />
              <br />
              <TextField
                fullWidth
                id="filled-basic"
                label="Description"
                variant="outlined"
                value={skillDescription}
                onChange={(e) => setskillDescription(e.target.value)}
              />
            </Box>
            <br />
            {add && (
              <Box sx={{ mt: 3, textAlign: "right" }}>
                <LoadingButton
                  loading={postProjectRes.isLoading}
                  loadingPosition="start"
                  startIcon={postProjectRes.isLoading ? <Add /> : null}
                  variant="contained"
                  onClick={postNewProject}
                >
                  Ok
                </LoadingButton>
              </Box>
            )}
            {edit && (
              <Box sx={{ mt: 3, textAlign: "right" }}>
                <LoadingButton
                  loading={updateProjectRes.isLoading}
                  loadingPosition="start"
                  startIcon={updateProjectRes.isLoading ? <Save /> : null}
                  variant="contained"
                  onClick={editProject}
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
