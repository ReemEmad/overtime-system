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
  Paper,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { styled } from "@mui/material/styles";
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
import DeletePopup from "../components/Popups/DeletePopup";
import JobPopup from "../components/Popups/JobPopup";
import JobCard from "../components/JobCard";

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

export default function Jobs() {
  const [jobTitle, setjobTitle] = useState("");
  const [jodDescription, setjobDescription] = useState("");
  const [jobs, setjobs] = useState([]);
  const [openAddJob, setopenAddJob] = useState(false);

  const [openDelete, setopenDelete] = useState(false);
  const page_number = 1;
  const page_size = 100;
  const [deleteJob, deleteJobRes] = useDeleteJobMutation();
  const [jobId, setJobId] = useState<string>("");
  const { data, isSuccess, isLoading } = useGetJobsQuery({
    page_number,
    page_size,
  });
  const [updateJob, updateJobRes] = usePostJobMutation();
  const handleCloseDelete = () => setopenDelete(false);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
    if (isSuccess) {
      setjobs(data.body);
    }
  }, [data]);


  return (
    <>
      <Box
        sx={{
          marginBottom: "15px",
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddCircle />}
          size="medium"
          onClick={() => setopenAddJob(true)}
        >
          Add a job
        </Button>
      </Box>
      <Box>
        <Grid container spacing={1}>
          {isLoading && <CircularProgress color="inherit" />}
          {jobs.map((job: JobDTO) => (
            <Grid item xs={3} key={job.id}>
              <JobCard job={job} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
