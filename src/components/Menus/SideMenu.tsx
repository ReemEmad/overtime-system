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
import InboxIcon from "@mui/icons-material/MoveToInbox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import MailIcon from "@mui/icons-material/Mail";
import AdminLanding from "../../pages/AdminLanding";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getUserRole } from "../../utils/utility";
import { appRoutes } from "../../data/constants/appRoutes";
import { UserRoles } from "../../data/DTO/Roles";

const drawerWidth = 240;

export default function SideMenu() {
  const role = getUserRole();
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Divider />
          {role === UserRoles.Admin && (
            <List>
              {["Listed Jobs"].map((text) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={() => navigate(appRoutes.ADMIN_LANDING_JOBS)}
                  >
                    <ListItemIcon>
                      <AddBoxIcon />
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
                      <AddBoxIcon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
          {role === UserRoles.SquadLead && (
            <List>
              {["quick links: TBD"].map((text) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                  // onClick={() => navigate(appRoutes.ADMIN_LANDING_JOBS)}
                  >
                    <ListItemIcon>
                      <AddBoxIcon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />
        </Box>
      </Box>
      <Outlet />
    </>
  );
}
