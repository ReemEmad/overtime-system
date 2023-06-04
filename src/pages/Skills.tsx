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
  useGetSkillsQuery,
  usePostSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} from "../services/skill.service";
import { LoadingButton } from "@mui/lab";
import SideMenu from "../components/Menus/SideMenu";
import { AddCircle, CleaningServices, Send } from "@mui/icons-material";
import { Edit, Delete, Save } from "@mui/icons-material";
import { skillDto } from "../data/DTO/Skill";
import DeletePopup from "../components/Popups/DeletePopup";
import SkillPopup from "../components/Popups/SkillPopup";
import SkillCard from "../components/SkillCard";

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

export default function Skills() {
  const [skillTitle, setskillTitle] = useState("");
  const [skillDescription, setskillDescription] = useState("");
  const [skills, setskills] = useState([]);
  const [openAddskill, setopenAddskill] = useState(false);

  const [openDelete, setopenDelete] = useState(false);
  const page_number = 1;
  const page_size = 100;
  const [deleteskill, deleteskillRes] = useDeleteSkillMutation();
  const [skillId, setskillId] = useState<string>("");
  const { data, isSuccess, isLoading } = useGetSkillsQuery({
    page_number,
    page_size,
  });
  const [updateskill, updateskillRes] = usePostSkillMutation();
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
      setskills(data.body);
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
          onClick={() => setopenAddskill(true)}
        >
          Add a skill
        </Button>
      </Box>
      <Box>
        <Grid container spacing={1}>
          {isLoading && <CircularProgress color="inherit" />}
          {skills.map((skill: skillDto) => (
            <Grid item xs={3} key={skill.id}>
              <SkillCard Skill={skill}></SkillCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      <SkillPopup add={true} open={openAddskill} setOpen={setopenAddskill} />
    </>
  );
}
