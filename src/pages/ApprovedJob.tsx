import React, { useContext, useEffect, useState } from "react";
import { useGetApprovedPositionByIdQuery } from "../services/positions.service";
import { useParams } from "react-router-dom";
import { JobDTO } from "../data/DTO/Job";
import { JobToEdit } from "../data/DTO/JobToPost";
import { getCreatedDate } from "../utils/utility";
import { stringAvatar } from "../utils/utility";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import {
  Typography,
  CircularProgress,
  Box,
  Chip,
  ListItem,
  Avatar,
  List,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { appRoutes } from "../data/constants/appRoutes";
import { UserProvider } from "../context/UserProvider";

function ApprovedJob() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { updateUserData } = useContext(UserContext);
  const { data, isSuccess, isLoading } = useGetApprovedPositionByIdQuery({
    id,
  });
  const [job, setjob] = useState<JobToEdit>();
  const [users, setusers] = useState<any[]>();

  useEffect(() => {
    if (isSuccess) {
      setjob(data.body.job);
      setusers(data.body.users);
    }
  }, [isSuccess]);

  const handleNavigation = (user: any) => {
    updateUserData(user.user);
    navigate(appRoutes.CANDIDATE_PROFILE);
  };

  return (
    <>
      <UserProvider>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <>
            <Typography variant="h5" color="primary">
              {job?.job_name}
            </Typography>
            <Typography>
              Added on {getCreatedDate(job?.job_created_date)}
            </Typography>
            <br />
            <Typography variant="h6" color="InfoText">
              TPL {job?.job_tpl_name}
            </Typography>
            <br />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Typography>Skills</Typography>
              {job?.skill_list.map((skill: any) => (
                <Chip
                  label={skill.name}
                  key={skill.id}
                  size="small"
                  color="secondary"
                />
              ))}
            </Box>
            <br />
            <Typography>
              required position:{" "}
              <span style={{ color: "crimson" }}>
                {job?.job_employee_required_position}
              </span>
            </Typography>
            <br />
            <Typography>
              weekly hours:
              <span style={{ color: "crimson" }}>
                {" "}
                {job?.job_weekly_hours_required}hrs
              </span>
            </Typography>
            <Typography>
              expected start date:{" "}
              <span style={{ color: "blue" }}>
                {" "}
                {getCreatedDate(job?.job_expected_start_date)}
              </span>
            </Typography>
            <Typography>
              {" "}
              expected end date{" "}
              <span style={{ color: "blue" }}>
                {getCreatedDate(job?.job_expected_end_date.String)}
              </span>
            </Typography>
            <br />
            {users && users.length > 0 && (
              <>
                <Typography color="info">Users Applied</Typography>
                <br />
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  {users?.map((user: any) => (
                    <ListItem
                      key={user.id}
                      alignItems="flex-start"
                      onClick={() => handleNavigation(user)}
                    >
                      <ListItemAvatar>
                        <Avatar
                          // className={classes.avatar}
                          alt={user.user.name}
                          {...stringAvatar(user.user.name)}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={user.user.name}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {user.user.work_title}
                            </Typography>
                            {"—" + user.user.work_location}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </>
        )}
      </UserProvider>
    </>
  );
}

export default ApprovedJob;
