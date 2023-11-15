import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Box,
  CircularProgress,
  Grid,
  Chip,
  Button,
  Modal,
  Divider,
  SwipeableDrawer,
  Stack,
} from "@mui/material";
import { Edit, AccessTime, Work } from "@mui/icons-material";
import { getCreatedDate } from "../utils/utility";
import EditPositionPopup from "./Popups/EditPositionPopup";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../data/constants/appRoutes";
import { useApplyPositionMutation } from "../services/positions.service";
import OverlappingAvatars from "./OverlappingAvatars";
import useAlert from "./Alerts/useAlert";
import { useApproveJobMutation } from "../services/cfo.service";

function PositionCard(props: {
  jobPosition: any;
  editable?: boolean;
  candidateJob?: boolean;
  score?: number;
  cfo?: boolean;
}) {
  const [AlertComponent, showAlert] = useAlert();
  const navigate = useNavigate();
  const { jobPosition: item } = props;
  const [approveJob, approveJobRes] = useApproveJobMutation();
  const [openEdit, setopenEdit] = useState(false);
  const [openSideDrawer, setOpenSideDrawer] = useState(false);
  const [applyJob, applyJobRes] = useApplyPositionMutation();
  const [userApplied, setuserApplied] = useState<Boolean>(false);

  type Anchor = "top" | "left" | "bottom" | "right";

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpenSideDrawer((prev) => !prev);
    };

  const handleOnClick = () => {
    item.job_status === "approved" && !props.candidateJob
      ? navigate(
          appRoutes.SQUADLEAD_LANDING_APPROVED_POSITIONS + `/${item.job_id}`
        )
      : setOpenSideDrawer(true);
  };

  const handleApply = async () => {
    await applyJob({ id: item.job_id });
  };

  const handleApprove = async () => {
    await approveJob({ id: item.job_id });
  };

  useEffect(() => {
    if (applyJobRes.isSuccess) {
      setuserApplied(true);
      showAlert([applyJobRes.data.messages[0].message], "success");
    }
    if (applyJobRes.isError) {
      console.log(applyJobRes);
      showAlert([applyJobRes?.error?.data?.messages[0].message], "error");
    }
  }, [applyJobRes]);

  useEffect(() => {
    if (approveJobRes.isSuccess) {
      showAlert([approveJobRes.data.messages[0].message], "success");
    }
    if (approveJobRes.isError) {
      console.log(approveJobRes);
      showAlert([approveJobRes?.error?.data?.messages[0].message], "error");
    }
  }, [approveJobRes]);

  return (
    <>
      <AlertComponent />
      <Card
        sx={{
          width: 400,
          minHeight: "240px",
          marginTop: "10px",
          position: "relative",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", cursor: "pointer" }}
              onClick={handleOnClick}
            >
              {item.job_employee_required_position}
            </Typography>
            <br />
            {!props.candidateJob && (
              <Chip
                size="small"
                label={item.job_status}
                color={item.job_status === "pending" ? "info" : "primary"}
              />
            )}
          </Box>
          <Typography variant="caption" align="right">
            Project <strong>{item.project_name}</strong>
          </Typography>
          <br />
          <br />
          <Typography variant="caption" align="right" gutterBottom>
            skills: {""}
          </Typography>

          {item.skill_list.map((skill: any) => (
            <Chip label={skill.name} key={skill.id} size="small" />
          ))}
          <br />
          <br />
          <Typography gutterBottom color="text.secondary" variant="body2">
            Added on {getCreatedDate(item.job_created_date)}
          </Typography>
        </CardContent>
        <Divider />
        {item.users && <OverlappingAvatars users={item.users} />}
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            placeItems: "center",
          }}
        >
          {props.score !== undefined && (
            <Typography color="text.primary" variant="body2">
              <strong>{props.score}% match!</strong>
            </Typography>
          )}
          {props.candidateJob && !userApplied && (
            <>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={handleApply}
              >
                Apply
              </Button>
            </>
          )}
          {props.cfo && (
            <Box sx={{ position: "absolute", top: "80%", left: "2%" }}>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={handleApprove}
              >
                Approve
              </Button>
            </Box>
          )}
          {props.editable && (
            <Edit
              sx={{
                pl: "93%",
                pt: 4,
                cursor: "pointer",
              }}
              color="primary"
              onClick={() => {
                setopenEdit(true);
              }}
            />
          )}
        </CardActions>
      </Card>
      <EditPositionPopup
        open={openEdit}
        setOpen={setopenEdit}
        position={item}
      />
      <div>
        <React.Fragment>
          <SwipeableDrawer
            anchor={"right"}
            open={openSideDrawer}
            onClose={toggleDrawer("right", false)}
            onOpen={toggleDrawer("right", true)}
            PaperProps={{
              sx: {
                width: 300,
                padding: "10px",
                background: "#e7e7e7",
              },
            }}
          >
            <Stack direction="row" spacing={1}>
              <Work fontSize="small" />
              <Typography variant="body2" sx={{ cursor: "pointer" }}>
                {item.job_name}
              </Typography>
            </Stack>
            <br />

            <Typography fontWeight={"bold"}>
              {item.job_employee_required_position}
            </Typography>
            <br />
            <Stack direction="row" spacing={0.5}>
              <AccessTime fontSize="small" color="primary" />
              <Typography variant="body2">
                Exptected to Start on{" "}
                {getCreatedDate(item.job_expected_start_date)}{" "}
              </Typography>
            </Stack>
            <br />
            <Typography>Skills for this job</Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              {item.skill_list.map((skill: any) => (
                <>
                  <Divider />
                  <Chip label={skill.name} key={skill.id} size="small" />
                </>
              ))}
            </Box>
            <br />
            <Typography variant="body2">
              Expected to end on{" "}
              {getCreatedDate(item.job_expected_end_date?.String)}
            </Typography>
            <br />
            <Typography variant="caption">
              <b>Current status</b>{" "}
              <Chip size="small" label={item.job_status} color="info" />
            </Typography>
          </SwipeableDrawer>
        </React.Fragment>
      </div>
    </>
  );
}

export default PositionCard;
