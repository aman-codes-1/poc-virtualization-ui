import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Icon,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Listboard } from ".";
import { Switch } from "react-router-dom";
import { PublicRoute } from "../../../routes";
import {
  PageNotFound,
  HeadPage,
  ServerDataTable,
  ServerDropDown,
  ClientDataTable,
  ClientDropDown,
} from "../../../pages";
import { AppBar, Drawer } from ".";
import SuccessiveIcon from "../../../images/favicon.ico";

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <ThemeProvider
      theme={createTheme({
        components: {
          MuiListItemButton: {
            defaultProps: {
              disableTouchRipple: true,
            },
          },
        },
        palette: {
          mode: "light",
          background: { paper: "rgb(27,50,70)" },
        },
      })}
    >
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="absolute"
          open={open}
          style={{ backgroundColor: "rgb(27,50,70)" }}
        >
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Render Large Data
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            {open && (
              <>
                <ListItemButton>
                  <ListItemIcon sx={{ fontSize: 20 }}>
                    <Icon>
                      <img
                        alt="Successive"
                        src={SuccessiveIcon}
                        maxWidth="100%"
                        height="100%"
                      />
                    </Icon>
                  </ListItemIcon>
                  <ListItemText
                    sx={{ my: 0 }}
                    primary="Successive"
                    primaryTypographyProps={{
                      color: "white",
                      fontSize: 20,
                      fontWeight: "medium",
                      letterSpacing: 0,
                    }}
                  />
                </ListItemButton>
                <Divider />
              </>
            )}
            <IconButton onClick={toggleDrawer} sx={{ color: "white" }}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List disablePadding>
            <Listboard open={open} />
          </List>
          <Divider />
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Switch>
              <PublicRoute exact path="/" component={HeadPage} />
              <PublicRoute path="/project_overview" component={HeadPage} />
              <PublicRoute
                path="/server_side/table"
                component={ServerDataTable}
              />
              <PublicRoute
                path="/server_side/dropdown"
                component={ServerDropDown}
              />
              <PublicRoute
                path="/client_side/table"
                component={ClientDataTable}
              />
              <PublicRoute
                path="/client_side/dropdown"
                component={ClientDropDown}
              />
              <PublicRoute component={PageNotFound} />
            </Switch>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
