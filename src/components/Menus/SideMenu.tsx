import * as React from "react";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getUserRole } from "../../utils/utility";
import { appRoutes } from "../../data/constants/appRoutes";
import { UserRoles } from "../../data/DTO/Roles";
import {
  AccountCircleOutlined,
  ExitToApp,
  Work,
  LaptopChromebook,
  Dashboard,
} from "@mui/icons-material";

const drawerWidth = 240;

export default function SideMenu() {
  const role = getUserRole();
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", width: "100%", minHeight: "100%" }}>
      <Box sx={{ flex: "1 0 15%" }}>
        <Drawer
          sx={{
            width: "100%",
            position: "unset",
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Box sx={{ padding: "1rem" }}>
            <img
              width="150px"
              src="https://social.engagedly.com/uploads/62f54b89-db72-4076-9499-3547c51de48a/62f54b89-db72-4076-9499-3547c51de48a/social/picture/file/4254624/reduced_Integrant-Brand-Logo-Colored-2020.png"
            />
          </Box>
          <Divider />
          {role === UserRoles.Admin && (
            <List>
              {["Dashboard"].map((text) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={() => navigate(appRoutes.ADMIN_LANDING)}
                  >
                    <ListItemIcon>
                      <Dashboard color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
              {["Listed Job Titles"].map((text) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={() => navigate(appRoutes.ADMIN_LANDING_JOBS)}
                  >
                    <ListItemIcon>
                      <Work color="info" />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
              {["Listed Skills"].map((text) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={() => navigate(appRoutes.ADMIN_LANDING_SKILLS)}
                  >
                    <ListItemIcon>
                      <LaptopChromebook />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
              {["Signout"].map((text) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton onClick={() => navigate(appRoutes.SIGNOUT)}>
                    <ListItemIcon>
                      <ExitToApp color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
          {role === UserRoles.Operation && (
            <List>
              {["Dashboard"].map((text) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={() => navigate(appRoutes.CANDIDATE_LANDING)}
                  >
                    <ListItemIcon>
                      <Dashboard color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
              {["Profile"].map((text) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={() => navigate(appRoutes.CANDIDATE_PROFILE)}
                  >
                    <ListItemIcon>
                      <AccountCircleOutlined color="info" />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
              {["Signout"].map((text) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton onClick={() => navigate(appRoutes.SIGNOUT)}>
                    <ListItemIcon>
                      <ExitToApp />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}

          {role === UserRoles.SquadLead && (
            <List>
              {["Dashboard"].map((text) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={() => navigate(appRoutes.SQUADLEAD_LANDING)}
                  >
                    <ListItemIcon>
                      <Dashboard color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
              {["Projects"].map((text) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={() =>
                      navigate(appRoutes.SQUADLEAD_LANDING_POSITIONS)
                    }
                  >
                    <ListItemIcon>
                      <LaptopChromebook color="info" />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
              {["Approved Jobs"].map((text) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={() =>
                      navigate(appRoutes.SQUADLEAD_LANDING_APPROVED_POSITIONS)
                    }
                  >
                    <ListItemIcon>
                      <Work />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
              {["Signout"].map((text) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton onClick={() => navigate(appRoutes.SIGNOUT)}>
                    <ListItemIcon>
                      <ExitToApp color="info" />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}

          {role === UserRoles.CFO && (
            <List>
              {["Dashboard"].map((text) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={() => navigate(appRoutes.CFO_LANDING)}
                  >
                    <ListItemIcon>
                      <Dashboard color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
              {["Signout"].map((text) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton onClick={() => navigate(appRoutes.SIGNOUT)}>
                    <ListItemIcon>
                      <ExitToApp color="info" />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
        </Drawer>
      </Box>
      <Box sx={{ backgroundColor: "#f8f8f8", padding: "40px", width: "100%" }}>
        <Outlet />
      </Box>
    </Box>
  );
}
