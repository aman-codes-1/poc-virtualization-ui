import React, { useState, forwardRef, createContext } from "react";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export const SnackbarContext = createContext();

const SnackbarProvider = (props) => {
  const { children } = props;
  const [snackbarValues, setSnackbarValues] = useState({
    open: false,
    msg: "",
    stat: "",
  });

  const handleOpen = (message, status) => {
    setSnackbarValues({
      ...snackbarValues,
      open: true,
      msg: message,
      stat: status,
    });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarValues({ ...snackbarValues, open: false });
  };

  return (
    <>
      <SnackbarContext.Provider value={handleOpen}>
        {children}
      </SnackbarContext.Provider>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={snackbarValues.open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={snackbarValues.stat}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbarValues.msg}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
};

SnackbarProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default SnackbarProvider;
