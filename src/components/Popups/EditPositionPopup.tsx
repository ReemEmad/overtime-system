import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  Chip,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { useUpdateJobMutation } from "../../services/job.service";
import { JobToEdit } from "../../data/DTO/JobToPost";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

import dayjs, { Dayjs } from "dayjs";
import { useUpdatePositionMutation } from "../../services/positions.service";
import { LoadingButton } from "@mui/lab";
import { Save } from "@mui/icons-material";
import useAlert from "../Alerts/useAlert";
import { useGetSkillsQuery } from "../../services/skill.service";

export default function EditPositionPopup(props: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  position: JobToEdit;
}) {
  const { open, setOpen, position } = props;

  const [AlertComponent, showAlert] = useAlert();

  const [jobTitle, setjobTitle] = useState(position?.job_name);
  const [tplName, settplName] = useState(position?.job_tpl_name);
  const [skillsSelected, setSkillsSelected] = useState<string[]>([]);
  const [weeklyHours, setweeklyHours] = useState<number>(
    position?.job_weekly_hours_required
  );

  const [jobSkills, setjobSkills] = useState([]);
  const { data: skills, isSuccess: isGetSkills } = useGetSkillsQuery({
    page_number: 0,
    page_size: 0,
  });
  const [updateJob, updateJobRes] = useUpdatePositionMutation();

  const [skillIds, setskillIds] = useState<string[]>([]);

  const [value, setValue] = useState<Dayjs | string>(
    dayjs(position.job_expected_start)
  );
  const [endDate, setendDate] = useState<Dayjs | string>(
    dayjs(position.job_expected_end.String)
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
    console.log("~", position);

    updateJob({
      id: position?.job_id,
      body: {
        job_id: position?.job_id,
        job_name: jobTitle,
        job_tpl_name: tplName,
        job_expected_start_date: dayjs(value).format("YYYY/MM/DD"),
        job_expected_end_date: dayjs(endDate).format("YYYY/MM/DD"),
        job_weekly_hours_required: weeklyHours,
      },
    });
  };

  useEffect(() => {
    if (isGetSkills) {
      setjobSkills(skills.body);
      // setSkillsSelected()
      // setProjects(data.body);
    }
  }, [isGetSkills]);

  useEffect(() => {
    if (updateJobRes.isSuccess) {
      showAlert([updateJobRes.data.messages[0].message], "success");
      handleClose();
    }
    if (updateJobRes.isError) {
      showAlert([updateJobRes.data.messages[0].message], "error");
    }
  }, [updateJobRes.isSuccess, updateJobRes.isError]);

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

  useEffect(() => {
    const similarSkillIds = compareSkills(jobSkills, skillsSelected);
    setskillIds(similarSkillIds);
  }, [skillsSelected]);

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
          {/* <Box sx={{ mb: 2 }}> */}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit this job
          </Typography>
          {/* </Box> */}

          {/* <DialogContent> */}
          <Box>
            <TextField
              fullWidth
              id="filled-basic"
              label="Job Name"
              variant="filled"
              value={jobTitle}
              onChange={(e) => setjobTitle(e.target.value)}
            />
            <TextField
              fullWidth
              id="filled-basic"
              label="Tpl Name"
              variant="filled"
              value={tplName}
              onChange={(e) => settplName(e.target.value)}
            />
            <TextField
              fullWidth
              type="number"
              id="filled-basic"
              label="Weekly hours required"
              variant="filled"
              value={weeklyHours}
              onChange={(e) => setweeklyHours(+e.target.value)}
            />

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
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-multiple-chip-label">
                Select skills
              </InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={skillsSelected}
                // onChange={handleChange}
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
            <Box sx={{ mt: 3, pr: 1 }}>
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
          {/* </DialogContent> */}
          {/* <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={editJob}>Confirm</Button>
              </DialogActions> */}
        </Box>
      </Modal>
    </>
  );
}
