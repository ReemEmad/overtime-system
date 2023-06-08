import React, { useEffect, useState } from "react";
import {
  Typography,
  Chip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Box,
  InputLabel,
} from "@mui/material";
import { useGetSkillsQuery } from "../services/skill.service";
import { skillDto } from "../data/DTO/Skill";
import { usePostCandidateSkillMutation } from "../services/skill.service";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../data/constants/appRoutes";
import { LoadingButton } from "@mui/lab";
import { Save } from "@mui/icons-material";

const CandidateSkills = () => {
  const navigate = useNavigate();
  const [skills, setskills] = useState<skillDto[]>([]);
  const { data: skillsList, isSuccess: isGetSkills } = useGetSkillsQuery({
    page_number: 0,
    page_size: 0,
  });
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState("");
  const [postSkills, postSkillsRes] = usePostCandidateSkillMutation();
  const [experiences, setexperiences] = useState([]);
  const [userSkills, setuserSkills] = useState<any>([]);

  const handleSkillClick = (skillId: number) => {
    if (selectedSkills.includes(skillId)) {
      setSelectedSkills(selectedSkills.filter((id) => id !== skillId));
    } else {
      setSelectedSkills([...selectedSkills, skillId]);
    }
  };

  useEffect(() => {
    const { experiences } = JSON.parse(localStorage.getItem("constants") ?? "");
    setexperiences(experiences);
  }, []);

  useEffect(() => {
    if (isGetSkills) {
      setskills(skillsList.body);
    }
  }, [isGetSkills]);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleConfirmSkills = () => {
    // Handle the selected skills and corresponding experiences
    postSkills(userSkills);

    if (postSkillsRes.isSuccess) {
      handleCloseDialog();
      navigate(appRoutes.CANDIDATE_LANDING);
    }
  };

  const handleChange = (event: SelectChangeEvent, skillId: number) => {
    console.log(event.target.value as string);
    setSelectedExperience(event.target.value as string);
    const foundObject = userSkills.find((obj: any) => obj.skill === skillId);
    if (!foundObject) {
      setuserSkills([
        ...userSkills,
        { skill: skillId, level_of_experience: event.target.value as string },
      ]);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#F5F5F5",
        padding: "30px",
        textAlign: "center",
        width: "300px",
        margin: "10% auto",
        borderRadius: "20px",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Select your skills
      </Typography>
      <div>
        {skills.map((skill: any) => (
          <Chip
            key={skill.id}
            label={skill.name}
            clickable
            color={selectedSkills.includes(skill.id) ? "primary" : "default"}
            onClick={() => handleSkillClick(skill.id)}
            style={{ margin: 4 }}
          />
        ))}
      </div>
      <Button
        variant="contained"
        onClick={handleOpenDialog}
        disabled={selectedSkills.length === 0}
      >
        Choose Experiences
      </Button>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Select Experiences</DialogTitle>
        <DialogContent>
          {selectedSkills.map((skillId) => {
            const skill = skills.find((skill: any) => skill.id === skillId);
            if (!skill) return null;
            return (
              <div key={skill.id}>
                <Typography variant="h6">{skill.name}</Typography>
                <Box sx={{ minWidth: 220 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Experience
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      // value={selectedExperience}
                      label="Experience"
                      onChange={(e) => handleChange(e, skillId)}
                    >
                      {experiences.map((experience) => (
                        <MenuItem value={experience} key={experience}>
                          {experience}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </div>
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <LoadingButton
            loading={postSkillsRes.isLoading}
            loadingPosition="start"
            startIcon={postSkillsRes.isLoading ? <Save /> : null}
            onClick={handleConfirmSkills}
            variant="contained"
            disabled={selectedSkills.length === 0}
          >
            Confirm
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CandidateSkills;
