import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { JobToEdit } from "../../data/DTO/JobToPost";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

import dayjs, { Dayjs } from "dayjs";
import {
  useGetProjectsQuery,
  useUpdatePositionMutation,
  useDeleteSkillPositionMutation,
} from "../../services/positions.service";
import { LoadingButton } from "@mui/lab";
import { Save } from "@mui/icons-material";
import useAlert from "../Alerts/useAlert";
import { useGetSkillsQuery } from "../../services/skill.service";
import { useGetJobsQuery } from "../../services/job.service";

export default function EditPositionPopup(props: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  position: JobToEdit;
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { data, isSuccess: isGetSuccess } = useGetProjectsQuery({});

  const { open, setOpen, position } = props;

  const [AlertComponent, showAlert] = useAlert();

  const [currentProject, setCurruentProject] = useState({
    id: position.project_id,
    name: position.project_name,
  });

  const [deleteSkill, deleteSkillRes] = useDeleteSkillPositionMutation();

  const [jobTitle, setjobTitle] = useState(position?.job_name);
  const [tplName, settplName] = useState(position?.job_tpl_name);
  const [skillsSelected, setSkillsSelected] = useState<any[]>([]);
  const [weeklyHours, setweeklyHours] = useState<number>(
    position?.job_weekly_hours_required
  );
  const [work_title, setworkTitle] = useState(
    position.job_employee_required_position
  );
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const skillNames = position.skill_list.map((skill: any) => skill.name);
    setSkillsSelected(skillNames);
  }, [position.skill_list.length]);

  const [jobSkills, setjobSkills] = useState([]);
  const { data: skills, isSuccess: isGetSkills } = useGetSkillsQuery({
    page_number: 0,
    page_size: 0,
  });

  const { data: jobPositions } = useGetJobsQuery({
    page_number: 0,
    page_size: 0,
  });

  const [updateJob, updateJobRes] = useUpdatePositionMutation();

  const [skillIds, setskillIds] = useState<string[]>([]);

  const [value, setValue] = useState<Dayjs | string>(
    dayjs(position.job_expected_start_date)
  );
  const [endDate, setendDate] = useState<Dayjs | any>(
    dayjs(position.job_expected_end_date?.String)
  );

  const handleClose = () => {
    setOpen(false);
  };

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

  const editJob = () => {
    updateJob({
      id: position?.job_id,
      body: {
        job_id: position?.job_id,
        job_name: jobTitle,
        job_tpl_name: tplName,
        job_expected_start_date: dayjs(value).format("YYYY/MM/DD"),
        job_expected_end_date: dayjs(endDate).format("YYYY/MM/DD"),
        job_weekly_hours_required: weeklyHours,
        skill_list: skillIds,
        project_id: currentProject.id,
      },
    });
  };

  useEffect(() => {
    if (isGetSkills) {
      setjobSkills(skills.body);
    }
  }, [isGetSkills]);

  useEffect(() => {
    if (updateJobRes.isSuccess) {
      showAlert([updateJobRes.data.messages[0].message], "success");
      handleClose();
    }
    if (updateJobRes.isError) {
      showAlert([updateJobRes!.data!.messages[0].message], "error");
    }
  }, [updateJobRes.isSuccess, updateJobRes.isError]);

  useEffect(() => {
    if (deleteSkillRes.isSuccess) {
      showAlert([deleteSkillRes.data.messages[0].message], "success");
    }
    if (deleteSkillRes.isError) {
      showAlert([updateJobRes!.data!.messages[0].message], "error");
    }
  }, [updateJobRes.isSuccess, updateJobRes.isError]);

  useEffect(() => {
    if (isGetSuccess) {
      setProjects(data.body);
    }
  }, [isGetSuccess]);

  function compareSkills(
    skills1 = jobSkills,
    skills2 = skillsSelected
  ): string[] {
    const skillMap = new Map<string, string>();
    for (const { id, name } of skills1) {
      skillMap.set(name, id);
    }

    const intersection: string[] = [];
    for (const name of skills2) {
      const id = skillMap.get(name);
      if (id) {
        intersection.push(id);
      }
    }
    return intersection;
  }

  const handleChange = (event: SelectChangeEvent<typeof skillsSelected>) => {
    const {
      target: { value },
    } = event;
    setSkillsSelected(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    const similarSkillIds = compareSkills(jobSkills, skillsSelected);
    setskillIds(similarSkillIds);
  }, [skillsSelected]);

  const handleDelete = (skillId: number) => {
    deleteSkill({ jobId: position.job_id, skillId: skillId });
  };

  return (
    <>
      <AlertComponent />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Box sx={style}>
          <Box sx={{ mb: 2 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit this job
            </Typography>
          </Box>

          <Box>
            <Stack direction="row" spacing={1}>
              <TextField
                size="small"
                // fullWidth
                id="outline-basic"
                label="Job Name"
                variant="outlined"
                value={jobTitle}
                onChange={(e) => setjobTitle(e.target.value)}
              />

              <TextField
                size="small"
                name="work_title"
                id="outline-basic"
                label="Work Title"
                select
                variant="outlined"
                onChange={(e: any) => {
                  setworkTitle(e.target.value);
                }}
                // fullWidth
                type="text"
                value={work_title}
              >
                {isGetSuccess &&
                  jobPositions?.body.map((option: any) => (
                    <MenuItem key={option.id} value={option.name}>
                      {option.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Stack>
            <br />

            <Stack direction="row" spacing={1}>
              <TextField
                size="small"
                fullWidth
                id="outline-basic"
                label="Tpl Name"
                variant="outlined"
                value={tplName}
                onChange={(e) => settplName(e.target.value)}
              />

              <TextField
                size="small"
                fullWidth
                type="number"
                id="outline-basic"
                label="Weekly hours required"
                variant="outlined"
                value={weeklyHours}
                onChange={(e) => setweeklyHours(+e.target.value)}
              />
            </Stack>
            <br />
            <Stack direction="row" spacing={1}>
              <DatePicker
                label="Job expected start date"
                value={value}
                onChange={(newValue: any) => setValue(newValue)}
              />

              <DatePicker
                sx={{ flexDirection: "column" }}
                label="Job expected end date"
                value={endDate}
                onChange={(newValue: any) => setendDate(newValue)}
              />
            </Stack>
            <br />
            <Stack direction="row">
              <TextField
                size="small"
                name="project_name"
                id="outline-basic"
                select
                label="Select Project Name"
                variant="outlined"
                value={currentProject.id}
                onChange={(e: any) => {
                  currentProject.id = e.target.value;
                  setCurruentProject({ ...currentProject });
                }}
                fullWidth
              >
                {projects?.map((option: any) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <br />

            {position.skill_list.map((skill: any) => (
              <span>
                <Chip
                  label={skill.name}
                  onDelete={() => handleDelete(skill.id)}
                />
              </span>
            ))}

            <br />
            <br />
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-multiple-chip-label">
                Select skills
              </InputLabel>
              <Select
                size="small"
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={skillsSelected}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value: any) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                // MenuProps={MenuProps}
              >
                {jobSkills.map((skill: any) => (
                  <MenuItem
                    key={skill.id}
                    value={skill.name}
                    // style={getStyles(name, personName, theme)}
                  >
                    {skill.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ mt: 3, textAlign: "right" }}>
              <LoadingButton
                loading={updateJobRes.isLoading}
                loadingPosition="start"
                startIcon={updateJobRes.isLoading ? <Save /> : null}
                variant="contained"
                onClick={editJob}
              >
                save
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
