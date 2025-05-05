import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Home from "@mui/icons-material/Home";
import {
  NavBarStyles,
  useStyles,
  styles,
  serverData,
  clientData,
  ThemeProviderComp,
} from ".";

const Listboard = ({ open }) => {
  const classes = useStyles();

  const [openServer, setOpenServer] = useState(true);
  const [openClient, setOpenClient] = useState(true);
  return (
    <Box>
      <ThemeProviderComp>
        <Paper elevation={4} sx={{ maxWidth: "100%" }}>
          <NavBarStyles component="nav" disablePadding>
            <ListItem
              component={NavLink}
              to="/project_overview"
              sx={{ color: "rgb(101,157,246)" }}
              activeClassName={classes.active}
              disablePadding
            >
              <ListItemButton sx={{ height: 56 }}>
                <ListItemIcon sx={{ color: "inherit" }}>
                  <Home />
                </ListItemIcon>
                <ListItemText
                  primary="Project Overview"
                  primaryTypographyProps={{
                    color: "inherit",
                    fontWeight: "medium",
                    variant: "body2",
                  }}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            <Box
              sx={{
                bgcolor: openServer ? "rgba(71, 98, 130, 0.2)" : null,
                pb: openServer ? 2 : 0,
              }}
            >
              <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpenServer(!openServer)}
                sx={{
                  px: 3,
                  pt: 2.5,
                  pb: openServer ? 0 : 2.5,
                  "&:hover, &:focus": {
                    "& svg": { opacity: openServer ? 1 : 0 },
                  },
                }}
              >
                <KeyboardArrowDown
                  sx={{
                    mr: -1,
                    opacity: 1,
                    transform: openServer ? "rotate(-180deg)" : "rotate(0)",
                    transition: "0.2s",
                  }}
                />
                <ListItemText
                  primary="Server Side"
                  primaryTypographyProps={styles.primaryTypography}
                  secondary="Cursor Pagination"
                  secondaryTypographyProps={{
                    noWrap: true,
                    fontSize: 12,
                    lineHeight: "16px",
                    ml: "35px",
                    color: openServer
                      ? "rgba(0,0,0,0)"
                      : "rgba(255,255,255,0.5)",
                  }}
                  sx={{ my: 0 }}
                />
              </ListItemButton>
              {openServer &&
                serverData?.map((item) => (
                  <ListItem
                    button
                    component={NavLink}
                    to={item.route}
                    activeClassName={classes.active}
                    key={item.label}
                    sx={{ py: 0, minHeight: 32, color: "rgba(255,255,255,.8)" }}
                  >
                    <ListItemIcon sx={{ color: "inherit" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={styles.primaryTypography2}
                    />
                  </ListItem>
                ))}
            </Box>
            <Box
              sx={{
                bgcolor: openClient ? "rgba(71, 98, 130, 0.2)" : null,
                pb: openClient ? 2 : 0,
              }}
            >
              <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpenClient(!openClient)}
                sx={{
                  px: 3,
                  pt: 2.5,
                  pb: openClient ? 0 : 2.5,
                  "&:hover, &:focus": {
                    "& svg": { opacity: openClient ? 1 : 0 },
                  },
                }}
              >
                <KeyboardArrowDown
                  sx={{
                    mr: -1,
                    opacity: 1,
                    transform: openClient ? "rotate(-180deg)" : "rotate(0)",
                    transition: "0.2s",
                  }}
                />
                <ListItemText
                  primary="Client Side"
                  primaryTypographyProps={styles.primaryTypography3}
                  secondary="Browser Pagination"
                  secondaryTypographyProps={{
                    noWrap: true,
                    fontSize: 12,
                    lineHeight: "16px",
                    ml: "35px",
                    color: openClient
                      ? "rgba(0,0,0,0)"
                      : "rgba(255,255,255,0.5)",
                  }}
                  sx={{ my: 0 }}
                />
              </ListItemButton>
              {openClient &&
                clientData?.map((item) => (
                  <ListItem
                    button
                    component={NavLink}
                    to={item.route}
                    activeClassName={classes.active}
                    key={item.label}
                    sx={styles.sx}
                  >
                    <ListItemIcon sx={{ color: "inherit" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={styles.primaryTypography4}
                    />
                  </ListItem>
                ))}
            </Box>
          </NavBarStyles>
        </Paper>
      </ThemeProviderComp>
    </Box>
  );
};

export default Listboard;
