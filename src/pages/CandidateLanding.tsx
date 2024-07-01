import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useGetCandidateJobsQuery } from "../services/user.service";
import { JobDTO } from "../data/DTO/Job";
import PositionCard from "../components/PositionCard";

function CandidateLanding() {
  const { data, isSuccess, isLoading } = useGetCandidateJobsQuery({});

  return (
    <>
      <Box>
        <Grid container spacing={1}>
          {isLoading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress color="primary" />
            </Box>
          )}
          {isSuccess &&
            data.body.length > 0 &&
            data?.body.map((job: JobDTO) => (
              <Grid item xs={4} key={job.id}>
                <PositionCard
                  jobPosition={job.job}
                  editable={false}
                  candidateJob={true}
                  score={job.score}
                />
              </Grid>
            ))}
          {data?.body.length === 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
                backgroundColor: "#f7f7f7",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{ marginBottom: "8px" }}
                color="textSecondary"
              >
                No available jobs to apply to at the moment.{"   "}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Check again later.
              </Typography>
            </Box>
          )}
        </Grid>
      </Box>
    </>
  );
}

export default CandidateLanding;
