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

  // const removeskill = () => {
  //   deleteUser(id as string);
  //   if (deleteUserRes.isSuccess) {
  //     setopenSuccess(true);
  //     handleCloseDelete();
  //   }
  // };

  const patchskill = () => {
    console.log("patched");
  };

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
          onClick={() => setopenAddskill(true)}
        >
          Add a skill
        </Button>
      </Box>
      <Box
        sx={{
          marginLeft: "300px",
          width: "60%",
        }}
      >
        <Grid container spacing={3}>
          {isLoading && <CircularProgress color="inherit" />}
          {skills.map((skill: skillDto) => (
            <Grid item xs={4} key={skill.id}>
              <SkillCard Skill={skill}>
                <Delete
                  color="error"
                  onClick={() => {
                    setskillId(skill.id);
                    setopenDelete(true);
                  }}
                />
              </SkillCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      <SkillPopup add={true} open={openAddskill} setOpen={setopenAddskill} />

      <DeletePopup
        handleOpenDelete={setopenDelete}
        openDelete={openDelete}
        DeleteModalTitle="Are You sure you want to delete this skill?"
      >
        <LoadingButton
          loading={deleteskillRes.isLoading}
          loadingPosition="start"
          startIcon={deleteskillRes.isLoading ? <Save /> : null}
          variant="contained"
          onClick={() => {
            deleteskill(skillId);
            setopenDelete(false);
          }}
          size="small"
        >
          Confirm
        </LoadingButton>
      </DeletePopup>
    </>
  );
}
