import SquadCard from "../components/SquadCard";
import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Grid,
  CircularProgress,
  Typography,
  Button,
  Container,
} from "@mui/material";

import { useGetUsersQuery } from "../services/user.service";
import { AddCircle, CleaningServices, Send } from "@mui/icons-material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import UserPopup from "../components/Popups/UserPopup";
import "../App.css";
import { userDataDto } from "../data/DTO/User";
import useRoleRedirect from "../hooks/userRedirectRole";
import useLocalStorage from "../hooks/useLocalStorage";
import { UserRoles } from "../data/DTO/Roles";
import { appRoutes } from "../data/constants/appRoutes";
import { useNavigate } from "react-router-dom";
import useAlert from "../components/Alerts/useAlert";

export default function AdminLanding() {
  const { data, isLoading, isSuccess, error } = useGetUsersQuery({});
  const [users, setUsers] = useState([]);
  const [addUserModal, setaddUserModal] = useState(false);
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("all");
  const [user] = useLocalStorage("userData", {});

  const chooseUserRole = (event: SelectChangeEvent) => {
    setSelectedRole(event.target.value);
  };
  const isAuthorized = useRoleRedirect(
    [UserRoles.Admin, UserRoles.CFO],
    appRoutes.CANDIDATE_LANDING,
    navigate
  );

  const filterUsersByRole = () => {
    const copyUsers = data.body.slice();
    const filteredUsers = copyUsers.filter((user: userDataDto) =>
      user?.role_name?.includes(selectedRole)
    );
    if (selectedRole === "all") {
      setUsers(data.body);
      return;
    }
    setUsers(filteredUsers as any);
  };

  useEffect(() => {
    if (isSuccess) {
      if (selectedRole) {
        filterUsersByRole();
      } else {
        setUsers(data.body);
      }
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      filterUsersByRole();
    }
  }, [selectedRole]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "end",
          marginBottom: "1rem",
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddCircle />}
          size="medium"
          onClick={() => setaddUserModal(true)}
        >
          Add new user
        </Button>
        <FormControl variant="outlined" sx={{ width: "200px" }}>
          <InputLabel id="demo-simple-select-label">
            Choose user role
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedRole}
            label="User Role"
            onChange={(e) => chooseUserRole(e)}
            color="info"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="squadlead">Squad Lead</MenuItem>
            <MenuItem value="cfo">CFO</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {isLoading && <CircularProgress color="inherit" />}

      <Grid container spacing={3}>
        {users.map((user: any) => (
          <Grid key={user.phone} item xs={12} sm={6} md={3}>
            <SquadCard user={user} />
          </Grid>
        ))}
      </Grid>

      <UserPopup open={addUserModal} setOpen={setaddUserModal} add={true} />
    </>
  );
}
