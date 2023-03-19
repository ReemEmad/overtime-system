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
import { Save } from "@mui/icons-material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { skillDto } from "../../data/DTO/Skill";
import {
  usePostSkillMutation,
  useUpdateSkillMutation,
} from "../../services/skill.service";

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
  add?: boolean;
  edit?: boolean;
  skill?: skillDto;
}) {
  const { open, setOpen, add = false, edit = false, skill } = props;

  const [skillTitle, setskillTitle] = useState(add ? "" : skill?.name);
  const [skillDescription, setskillDescription] = useState(
    add ? "" : skill?.description
  );

  const [openSuccess, setopenSuccess] = useState(false);

  const [postskill, { isLoading, isSuccess }] = usePostSkillMutation();
  const [updateskill, updateskillRes] = useUpdateSkillMutation();

  const handleClose = () => setOpen(false);

  const setModalTitle = () => {
    if (add) return "Add a new skill";
    return "Edit skill data";
  };

  const postNewskill = () => {
    postskill({
      name: skillTitle,
      description: skillDescription,
    });
  };

  const editskill = () => {
    updateskill({
      id: skill?.id,
      body: {
        name: skillTitle ?? "",
        description: skillDescription ?? "",
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
    if (updateskillRes.isSuccess) {
      setopenSuccess(true);
      handleClose();
    }
  }, [updateskillRes.isSuccess]);

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
          {add ? "skill added successfully" : "skill edited successfully"}
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
            <Box sx={{ ml: "21%" }}>
              <TextField
                id="filled-basic"
                label="Name"
                variant="filled"
                value={skillTitle}
                onChange={(e) => setskillTitle(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label="Description"
                variant="filled"
                value={skillDescription}
                onChange={(e) => setskillDescription(e.target.value)}
              />
            </Box>
            <br />
            {add && (
              <Box sx={{ mt: 3, pr: 1 }}>
                <LoadingButton
                  loading={isLoading}
                  loadingPosition="start"
                  startIcon={isLoading ? <Save /> : null}
                  variant="contained"
                  onClick={postNewskill}
                >
                  Ok
                </LoadingButton>
              </Box>
            )}
            {edit && (
              <Box sx={{ mt: 3, pr: 1 }}>
                <LoadingButton
                  loading={updateskillRes.isLoading}
                  loadingPosition="start"
                  startIcon={updateskillRes.isLoading ? <Save /> : null}
                  variant="contained"
                  onClick={editskill}
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
