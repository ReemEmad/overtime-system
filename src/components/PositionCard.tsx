import React, { useState } from "react";
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

function PositionCard(props: { jobPosition: any }) {
  const { jobPosition: item } = props;
  const [openEdit, setopenEdit] = useState(false);
  const [openSideDrawer, setOpenSideDrawer] = useState(false);

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

  return (
    <>
      <Card sx={{ width: 400, minHeight: "150px", marginTop: "10px" }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* <Button variant="text" onClick={() => setOpenSideDrawer(true)}> */}
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", cursor: "pointer" }}
              onClick={() => setOpenSideDrawer(true)}
            >
              {item.job_name}
            </Typography>
            {/* </Button> */}
            <Chip size="small" label={item.job_status} color="info" />
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
        <CardActions>
          <Box
            sx={{
              display: "flex",
              // alignItems: "right",
              pl: "93%",
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
          </Box>
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
                // textAlign: "right",
                background: "#e7e7e7",
              },
            }}
          >
            <Stack direction="row" spacing={1}>
              <Work fontSize="small" />
              <Typography
                variant="body2"
                // fontWeight={"bold"}
                sx={{ cursor: "pointer" }}
              >
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
