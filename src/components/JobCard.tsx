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
import { JobDTO } from "../data/DTO/Job";
import JobPopup from "./Popups/JobPopup";
import { getCreatedDate } from "../utils/getDate";

function JobCard(props: { job: JobDTO; children?: ReactNode }) {
  const { created_date, name: jobName, description } = props.job;
  const [openEdit, setopenEdit] = useState(false);
  return (
    <>
      <Card sx={{ width: 270, minHeight: "147px", position: "relative" }}>
        <CardContent>
          <Typography variant="h6" component="div">
            {jobName}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            created on {getCreatedDate(created_date)}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>

        <Box
          sx={{
            position: "absolute",
            textAlign: "right",
            top: "77%",
            right: "3%",
          }}
        >
          <Edit
            color="info"
            onClick={() => {
              setopenEdit(true);
            }}
          />
        </Box>
      </Card>
      <JobPopup
        open={openEdit}
        setOpen={setopenEdit}
        edit={true}
        job={props.job}
      />
    </>
  );
}

export default JobCard;
