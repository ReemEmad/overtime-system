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

function SkillCard(props: { Skill: skillDto; children?: ReactNode }) {
  const { created_date, name: SkillName, description } = props.Skill;
  const [openEdit, setopenEdit] = useState(false);
  return (
    <>
      <Card sx={{ width: 270, minHeight: "147px", position: "relative" }}>
        <CardContent>
          <Typography variant="h6" component="div">
            {SkillName}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Created on {getCreatedDate(created_date)}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>

        <Box
          sx={{
            textAlign: "right",
            cursor: "pointer",
            position: "absolute",
            top: "77%",
            right: "3%",
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
      </Card>
      <SkillPopup
        open={openEdit}
        setOpen={setopenEdit}
        edit={true}
        skill={props.Skill}
      />
    </>
  );
}

export default SkillCard;
