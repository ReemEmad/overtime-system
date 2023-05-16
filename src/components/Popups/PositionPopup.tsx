import * as React from "react";
import {
  Dispatch,
  SetStateAction,
  useState,
  forwardRef,
  useEffect,
} from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useGetSkillsQuery } from "../../services/skill.service";
import { Theme, useTheme } from "@mui/material/styles";

import {
  Chip,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Save } from "@mui/icons-material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import {
  usePostPositionsMutation,
  useUpdatePositionMutation,
  useGetProjectsQuery,
} from "../../services/positions.service";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import { useGetJobsQuery } from "../../services/job.service";

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

export default function PositionPopup(props: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  add?: boolean;
  edit?: boolean;
  position?: any;
}) {
  const { open, setOpen, add = false, edit = false, position } = props;
  const [value, setValue] = useState<Dayjs | string>(dayjs());
  const [endDate, setendDate] = useState<Dayjs | string>(dayjs());
  const [projects, setProjects] = useState([]);
  const [jobSkills, setjobSkills] = useState([]);
  const [skillsSelected, setSkillsSelected] = useState<string[]>([]);
  const [currentProject, setCurruentProject] = useState("");
  const [work_title, setworkTitle] = useState("");

  const [skillIds, setskillIds] = useState<string[]>([]);

  const [jobTitle, setjobTitle] = useState(add ? "" : position?.job_name);
  const [tplName, settplName] = useState(add ? "" : position?.job_tplName);
  const [weeklyHours, setweeklyHours] = useState<number>(
    add ? 0 : position?.job_weekly_hours_required
  );

  const { data: jobPositions, isSuccess: isGetPositionsSuccess } =
    useGetJobsQuery({
      page_number: 0,
      page_size: 0,
    });

  const [openSuccess, setopenSuccess] = useState(false);
  const { data, isSuccess: isGetSuccess } = useGetProjectsQuery({});
  const { data: skills, isSuccess: isGetSkills } = useGetSkillsQuery({
    page_number: 0,
    page_size: 0,
  });
  const [postJob, { isLoading, isSuccess }] = usePostPositionsMutation();
  const [updateJob, updateJobRes] = useUpdatePositionMutation();

  useEffect(() => {
    if (isGetSuccess) {
      // console.log("~", data);
      setProjects(data.body);
    }
  }, [isGetSuccess]);

  useEffect(() => {
    if (isGetSkills) {
      setjobSkills(skills.body);
      // setSkillsSelected()
      // setProjects(data.body);
    }
  }, [isGetSkills]);

  const handleClose = () => setOpen(false);

  const setModalTitle = () => {
    if (add) return "Add a new position";
    return "Edit position Data";
  };

  const postNewJob = () => {
    postJob({
      project_id: currentProject,
      job_name: jobTitle,
      job_expected_start_date: dayjs(value).format("YYYY/MM/DD"),
      job_weekly_hours_required: weeklyHours,
      skill_ids: skillIds,
      job_employee_required_position: work_title,
      job_tpl_name: tplName,
      job_expected_end_date: dayjs(endDate).format("YYYY/MM/DD"),
    });
  };

  const editJob = () => {
    console.log(position);
    // updateJob({
    //   id: position?.id,
    //   body: {
    //     job_name: jobTitle ?? "",
    //     skill_ids: [1, 2],
    //   },
    // });
  };

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

  // const getStyles = (
  //   name: string,
  //   personName: readonly string[],
  //   theme: Theme
  // ) => {
  //   return {
  //     fontWeight:
  //       personName.indexOf(name) === -1
  //         ? theme.typography.fontWeightRegular
  //         : theme.typography.fontWeightMedium,
  //   };
  // };

  useEffect(() => {
    const similarSkillIds = compareSkills(jobSkills, skillsSelected);
    setskillIds(similarSkillIds);
  }, [skillsSelected]);

  const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleCloseModal = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setopenSuccess(false);
  };

  useEffect(() => {
    if (isSuccess) {
      setopenSuccess(true);
      handleClose();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (updateJobRes.isSuccess) {
      setopenSuccess(true);
      handleClose();
    }
  }, [updateJobRes.isSuccess]);

  const handleChange = (event: SelectChangeEvent<typeof skillsSelected>) => {
    const {
      target: { value },
    } = event;

    setSkillsSelected(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <div>
      <Snackbar
        open={openSuccess}
        autoHideDuration={2000}
        onClose={handleCloseModal}
      >
        <Alert
          onClose={handleCloseModal}
          severity="success"
          sx={{ width: "100%" }}
        >
          {add ? "position added successfully" : "position edited successfully"}
        </Alert>
      </Snackbar>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box sx={{ mb: 2 }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {setModalTitle()}
              </Typography>
            </Box>
            <Box>
              <TextField
                fullWidth
                id="filled-basic"
                label="Job Name"
                variant="filled"
                value={jobTitle}
                onChange={(e) => setjobTitle(e.target.value)}
              />
              <Box>
                <TextField
                  name="work_title"
                  id="filled-basic"
                  label="Work Title"
                  select
                  variant="filled"
                  onChange={(e: any) => {
                    setworkTitle(e.target.value);
                  }}
                  fullWidth
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
              </Box>
              <br />
              <TextField
                fullWidth
                id="filled-basic"
                label="Tpl Name"
                variant="filled"
                value={tplName}
                onChange={(e) => settplName(e.target.value)}
              />
              <br />
              <TextField
                fullWidth
                type="number"
                id="filled-basic"
                label="Weekly hours required"
                variant="filled"
                value={weeklyHours}
                onChange={(e) => setweeklyHours(+e.target.value)}
              />
              <br />
              <TextField
                name="project_name"
                id="filled-select-currency"
                select
                label="Select Project Name"
                variant="filled"
                value={currentProject}
                onChange={(e: any) => {
                  setCurruentProject(e.target.value);
                }}
                fullWidth
              >
                {projects?.map((option: any) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>

              <br />
              <br />
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-multiple-chip-label">
                  Select skills
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={skillsSelected}
                  onChange={handleChange}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
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
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Job expected start date"
                  value={value}
                  onChange={(newValue: any) => setValue(newValue)}
                />
              </DemoContainer>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Job expected end date"
                  value={endDate}
                  onChange={(newValue: any) => setendDate(newValue)}
                />
              </DemoContainer>
            </Box>
            <br />
            {add && (
              <Box sx={{ mt: 3, pr: 1 }}>
                <LoadingButton
                  loading={isLoading}
                  loadingPosition="start"
                  startIcon={isLoading ? <Save /> : null}
                  variant="contained"
                  onClick={postNewJob}
                >
                  Ok
                </LoadingButton>
              </Box>
            )}
            {edit && (
              <Box sx={{ mt: 3, pr: 1 }}>
                <LoadingButton
                  loading={updateJobRes.isLoading}
                  loadingPosition="start"
                  startIcon={updateJobRes.isLoading ? <Save /> : null}
                  variant="contained"
                  onClick={editJob}
                >
                  Ok
                </LoadingButton>
              </Box>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
