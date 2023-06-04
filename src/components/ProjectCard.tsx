import React, { ReactNode, useState } from "react";
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
import { Edit, Delete, Save } from "@mui/icons-material";
import { skillDto } from "../data/DTO/Skill";
import SkillPopup from "./Popups/SkillPopup";
import { getCreatedDate } from "../utils/getDate";
import { projectDTO } from "../data/DTO/Project";
import ProjectPopup from "./Popups/ProjectPopup";

function ProjectCard(props: { project: projectDTO; children?: ReactNode }) {
  const { created_by, name: projectName, description } = props.project;
  const [openEdit, setopenEdit] = useState(false);
  return (
    <>
      <Card sx={{ width: 270 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {projectName}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
        <CardActions>
          <Box
            sx={{
              display: "flex",
              pl: "90%",
              pt: 4,
              cursor: "pointer",
            }}
          >
            <Edit
              color="primary"
              onClick={() => {
                setopenEdit(true);
              }}
            />
            {props.children}
          </Box>
        </CardActions>
      </Card>
      <ProjectPopup
        edit={true}
        open={openEdit}
        setOpen={setopenEdit}
        project={props.project}
      />
    </>
  );
}

export default ProjectCard;
