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
  CircularProgress,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Divider,
  TextField,
  Grid,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import {
  useGetJobsQuery,
  usePostJobMutation,
  useDeleteJobMutation,
  useUpdateJobMutation,
} from "../services/job.service";
import { LoadingButton } from "@mui/lab";
import SideMenu from "../components/Menus/SideMenu";
import { AddCircle, CleaningServices, Send } from "@mui/icons-material";
import { Edit, Delete, Save } from "@mui/icons-material";
import { JobDTO } from "../data/DTO/Job";

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

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function NewJob() {
  const [userEmail, setuserEmail] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const [jobs, setjobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setopenDelete] = useState(false);
  const page_number = 1;
  const page_size = 6;
  const [deleteJob, deleteJobRes] = useDeleteJobMutation();
  const [jobId, setJobId] = useState<string>("");
  const { data, isSuccess, isLoading } = useGetJobsQuery({
    page_number,
    page_size,
  });
  const [updateJob, updateJobRes] = usePostJobMutation();
  const handleCloseDelete = () => setopenDelete(false);

  useEffect(() => {
    if (isSuccess) {
      setjobs(data);
    }
  }, [data]);

  // const removeJob = () => {
  //   deleteUser(id as string);
  //   if (deleteUserRes.isSuccess) {
  //     setopenSuccess(true);
  //     handleCloseDelete();
  //   }
  // };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          placeItems: "center",
          justifyContent: "flex-end",
          gap: "10px",
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddCircle />}
          size="medium"
          onClick={() => setOpen(true)}
        >
          Add a job
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "20px",
          marginLeft: "300px",
        }}
      >
        {isLoading && <CircularProgress color="inherit" />}
        {jobs.map((job: JobDTO) => (
          <Card sx={{ width: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {job.name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {new Date(job.created_date).getUTCDate()}-
                {new Date(job.created_date).getMonth() + 1}-
                {new Date(job.created_date).getFullYear()}
              </Typography>
              <Typography variant="body2">{job.description}</Typography>
            </CardContent>
            <CardActions>
              <Box sx={{ display: "flex", alignItems: "left", pl: 1, pb: 1 }}>
                <Edit color="info" onClick={() => {}} />
                <Delete
                  color="error"
                  onClick={() => {
                    setJobId(job.id);
                    setopenDelete(true);
                  }}
                />
              </Box>
            </CardActions>
          </Card>
        ))}
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
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add a new job
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
            </Box>
            <br />
            <Box sx={{ mt: 3, pr: 1 }}>
              <LoadingButton
                loading={updateJobRes.isLoading}
                loadingPosition="start"
                startIcon={updateUserRes.isLoading ? <Save /> : null}
                variant="contained"
                onClick={editUser}
              >
                Ok
              </LoadingButton>
            </Box>
          </Box>
        </Fade>
      </Modal>
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
            // color=""
          >
            Are you sure you want to delete this job?
          </Typography>
          <br />
          <Box sx={{ mt: 3 }}>
            <LoadingButton
              loading={deleteJobRes.isLoading}
              loadingPosition="start"
              startIcon={deleteJobRes.isLoading ? <Save /> : null}
              variant="contained"
              onClick={() => {
                deleteJob(jobId);
                setopenDelete(false);
              }}
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
