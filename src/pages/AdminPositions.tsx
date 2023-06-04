import React, { useEffect, useState } from "react";
import { useGetProjectsQuery } from "../services/positions.service";
import { Box, Button, CircularProgress } from "@mui/material";
import ProjectCard from "../components/ProjectCard";
import { AddCircle } from "@mui/icons-material";
import ProjectPopup from "../components/Popups/ProjectPopup";

function AdminPositions() {
  const { data, isSuccess, isLoading } = useGetProjectsQuery({});
  const [addProject, setAddProjectModal] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
  }, []);

  return (
    <>
      <p style={{ margin: "auto" }}> {isLoading && <CircularProgress />}</p>
      <Button
        variant="contained"
        startIcon={<AddCircle />}
        size="medium"
        onClick={() => setAddProjectModal(true)}
      >
        Add new project
      </Button>
      <Box
        sx={{
          // marginLeft: "50%",
          display: "flex",
          flexGrow: 1,
          // flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        {/* <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}> */}
        {isSuccess &&
          data.body.map((item: any) => <ProjectCard project={item} />)}
        {/* </Grid>
    </Grid> */}
      </Box>
      <ProjectPopup add={true} open={addProject} setOpen={setAddProjectModal} />
    </>
  );
}

export default AdminPositions;
