import { Box, Button, CircularProgress, Grid } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../data/constants/appRoutes";
import { useGetCandidateJobsQuery } from "../services/user.service";
import JobCard from "../components/JobCard";
import { JobDTO } from "../data/DTO/Job";
import PositionCard from "../components/PositionCard";

function CandidateLanding() {
  const { data, isSuccess, isLoading } = useGetCandidateJobsQuery({});
  // const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      console.log("data", data);
    }
  }, [isSuccess]);

  return (
    <>
      <Box>
        <Grid container spacing={1}>
          {isLoading && <CircularProgress color="inherit" />}
          {!isLoading &&
            data.body.map((job: JobDTO) => (
              <Grid item xs={4} key={job.id}>
                <PositionCard
                  jobPosition={job.job}
                  editable={false}
                  candidateJob={true}
                  score={job.score}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
}

export default CandidateLanding;
